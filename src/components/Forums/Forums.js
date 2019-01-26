import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../Loading/Loading';
import ForumCategory from './ForumCategory/ForumCategory';

class Forums extends Component {

    state = {
        categorys: {},
        loading: true
    }

    componentDidMount() {
        axios.get('/api/forum/categorys')
        .then(res => {

            const results = res.data;

            let categorys = {};
            results.forEach(category=> {
                if (!categorys[category.category_name]) {
                    categorys[category.category_name] = {};
                    categorys[category.category_name].subs = [];
                    categorys[category.category_name].id = category.category_id;
                }
                


                const subForum = {
                    id: category.forum_id,
                    name: category.forum_name
                };

                categorys[category.category_name].subs.push(subForum);
            });

            this.setState({ categorys, loading: false });
        })
        .catch(err => console.log('Error while fetching categorys', err));
    }

    render() {
        if (this.state.loading) {
            return <Loading center={true} />
        }

        const cats = [];
        const { categorys } = this.state;
        for (let key in categorys) {
            const id = categorys[key].id;
            const subs = categorys[key].subs;
            cats.push(<ForumCategory key={id} name={key} subForums={subs} />);
        }
        return (
            <>
                { cats }
            </>
        );
    }
}

export default Forums;