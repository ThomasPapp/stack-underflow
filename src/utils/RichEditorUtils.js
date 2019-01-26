import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

/**
 * Converts the current content from the Draft.js EditorState into a raw
 * format which can be stored into the database.
 * 
 * @param {ContentState} content - The current content taken from the EditorState
 * @see {EditorState#getCurrentContent}
 * 
 * @returns {String} The content object converted to a string.
 */
function getRawContent(content) {
    return JSON.stringify(convertToRaw(content));
}

/**
 * Converts the raw content object string back into a format in which the EditorState can
 * read.
 * 
 * @param {String} rawContent - The raw content object string
 * 
 * @returns {EditorState} A new EditorState containing the provided content.
 */
function getEditorState(rawContent) {
    const content = convertFromRaw(JSON.parse(this.state.thread.content));
    return EditorState.createWithContent(content);
}