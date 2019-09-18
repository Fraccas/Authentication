import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api'; 

export default class AddBlog extends React.Component<IAddProps, IAddState> {
    constructor(props: IAddProps) {
        super(props);
        this.state = {
            name: '',
            blogTitle: '',
            blogContent: '', 
            tagID: '1',
            tags: []
        }
    }

    private saving: boolean = false;

    // grab all tags from DB
    async componentDidMount() {
        if (!User || User.userid === null || User.role !== 'admin') {
            this.props.history.replace('/login');
        } else {
            // logged in, grab them tag options
            try {
                let r = await fetch('/api/blogs/alltags');
                let tagsD = await r.json();
                this.setState({tags: tagsD});
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {  
        return (
            <div className="input-container bg-light p-2 m-0">
                <div className="form-group m-4 rounded p-4 border shadow">
                    <h2 className="text-center p-2 rounded bg-secondary text-light">Add Blog</h2>

                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder='username...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}></input>
                    <hr></hr>

                    <label htmlFor="tag-select">Choose a tag:</label><br></br>
                    <select id="tag-select" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tagID: e.target.value})}>
                        {this.LoopTags()}
                    </select>
                    <hr></hr>

                    <label htmlFor="blog">Blog Title</label>
                    <input type="text" className="form-control" placeholder='title...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ blogTitle: e.target.value })}></input>
                    <hr></hr>

                    <label htmlFor="blog">Blog Content</label>
                    <textarea className="form-control" placeholder="write your blog..." cols={100}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ blogContent: e.target.value })}></textarea>

                    <button className="btn btn-secondary mt-3 col-md-12 text-center" type="submit"
                        onClick={this.SubmitBlog}>Submit Chirp</button>
                </div>
            </div>
        );
    }

    LoopTags = () => {
        return (
        this.state.tags.map((t) => {
            return (<option key={t['name']} value={t['id']}>{t['name']}</option>);
            })
        );
    }

    // send user data to store on the backend
    SubmitBlog = async () => {
        if (this.saving) return; // already clicked and processing 

        if (this.state.name && this.state.blogTitle) {
            // get author id based on name given
            let authorID = '';
            let r = await fetch('/api/authors/' + this.state.name);
            let res = await r.json();
            if (res[0]) authorID = res[0]['id'];

            // if name does not exist create new author and grab id
            if (!authorID) {
                const settings = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                let r2 = await fetch('/api/authors/new/' + this.state.name, settings);
                let res2 = await r2.json();
                authorID = res2.toString();
            }

            try {
                this.saving = true;
                let url = '/api/blogs/post/' + this.state.blogTitle + '/' + this.state.blogContent + '/' + authorID + '/' + this.state.tagID;
                let result = await json(url, 'POST');

                if (result) {
                    this.setState({name: '', blogTitle: '', blogContent: ''});
                }
            } catch (e) {
                throw e;
            } finally {
                this.saving = false; // done with request 
            }
            
                
        } else {
            alert('Please enter a name and blog info.');
        }
    }
}

export interface IAddProps extends RouteComponentProps { }

export interface IAddState {
    name: string,
    blogTitle: string,
    blogContent: string,
    tagID: string,
    tags: Array<any>
}