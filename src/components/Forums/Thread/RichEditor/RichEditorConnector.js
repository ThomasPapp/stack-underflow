import React, { Component } from 'react';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';

/**
 * A higher-order component used to wrap a rich Draft.js editor to a component.
 * 
 * @author Thomas Papp
 * 
 * @param {Boolean} readOnly - If the wrapped editor should be set to read only
 */
const RichEditorConnector = (readOnly = false) => WrappedEditor => (
    class Connector extends Component {
        state = {
            editorState: this.props.editorState || EditorState.createEmpty()
        }

        updateEditorState = editorState => this.setState({ editorState });

         /**
          * Checks to see if the editor contains any content
          */
        isEmpty = () => !this.state.editorState.getCurrentContent().hasText;

        /**
         * Converts the current content from the EditorState into a raw
         * format which can be stored into a database.
         * 
         * @returns {String} The content object converted to a string.
         */
        getRawContent = () => JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    
        /**
         * Converts the raw content object string back into a format in which the EditorState
         * can read.
         * 
         * @param {String} rawContent - The raw content obejct string.
         * 
         * @returns {EditorState} A new EditorState containg the provided content
         */
        getEditorState = rawContent => {
            const content = convertFromRaw(JSON.parse(rawContent));
            return EditorState.createWithContent(content);
        }

        handleKeyCommand = command => {
            const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
            if (newState) {
                this.updateEditorState(newState);
                return 'handled';
            }
            return 'not-handled';
        }

        // styling methods
        toggleBold = () => this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
        toggleItalic = () => this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
        toggleUnderline = () => this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));

        render() {
            // if the editor is readonly we only send the editor with the 2 needed props:
            // the EditorState (the content), the getEditorState method, and the readonly flag
            if (readOnly) {
                return <WrappedEditor editorState={this.state.editorState} getEditorState={this.getEditorState} readOnly />
            }

            // the editor is not in readonly mode, so we send the full editor with all of the props
            // including, but not limited to the onChange and handleKeyCommand props
            return (
                <WrappedEditor
                    editorState={this.state.editorState}
                    onChange={this.updateEditorState}
                    isEmpty={this.isEmpty}
                    getRawContent={this.getRawContent}
                    handleKeyCommand={this.handleKeyCommand}
                    {...this.props}
                />
            );
        }
    }
);

export default RichEditorConnector;