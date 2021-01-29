import React, { Component } from 'react';
import { connect } from 'react-redux';
//actions
import { fetchUser, oldUser } from '../redux/actions/userActions'
import { fetchBlogs, fetchLikedBlogs } from '../redux/actions/blogsActions'
import { fetchLists } from '../redux/actions/listsActions'
//css
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import '../App.css'
//components
import TopNav from './TopNav'
import ListContainer from './ListContainer'
import Form from './UserForm'
import BlogForm from './BlogForm'
import BlogContainer from './BlogContainer'
import NewUserModal from './NewUserModal'




class Home extends Component {

    componentDidMount(){
        this.props.fetchLikedBlogs()
        this.props.fetchUser()
        this.props.fetchBlogs()
        this.props.fetchLists()
        this.fetchAdvice()
        if (localStorage.getItem('screen')){
            this.setState({screen: localStorage.getItem('screen')})
        }
    }

    state = {
        screen: "",
        blogID: "",
        modalNewUser: false,
        openNewUserModal: false,
        opened: false, 
        advice: "",
        otherUserId: "",
        otherUserName: ""
    }

    fetchAdvice = () => {
        fetch('http://localhost:3000/getadvice', 
            {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
        .then(res => res.json())
        .then(data => this.setState({advice: data.advice}))
    }

    handleHomeRender = (name, blogID="") => {
        blogID === "" ? this.setState({screen: name, otherUserId: ""}, () => {
            localStorage.setItem('screen', name)
        }) : 
        this.setState({screen: name, blogID, otherUserId: ""}, () => {
            localStorage.setItem('screen', name)
        })
    }

    handleOtherUserRender = (id, name) => {
        this.setState({otherUserId:id, otherUserName: name})
    }

    clearBlog = () => {
        this.setState({blogID: ""})
    }

    openModal = () => {this.setState({ openNewUserModal: true, modalNewUser: true, opened: true})}
    closeModal = () =>{
        this.setState({ openNewUserModal: false, screen: "Check in" }, () => this.props.oldUser())};

    handleOpenModal = () => {if (this.state.opened === false){ this.openModal() }}

    filterUserBlogs = () => {
        return this.props.allBlogs.filter(b => b.user_id === this.props.user.id)}


    filterPublicBlogs = () => {
        return this.props.allBlogs.filter(b => b.private === false || b.user_id === this.props.user.id)}


    filterLikedBlogs = () => {
        let likedIds = this.props.likedBlogs.map(b => b.id)
        return this.props.allBlogs.filter(b => likedIds.includes(b.id))}

    filterOtherUserBlogs = () => {
        return this.props.allBlogs.filter(b => b.user_id === this.state.otherUserId).filter(b => b.private === false)}

    
    render() {
        switch(this.state.screen) {
            case "Settings":
                return (
                <>
                
                <TopNav handleHomeRender={this.handleHomeRender} handlePlayer={this.props.handlePlayer}/>
                
                <div className="home-content-area">
                    <div className="wrapper">
                    <Form screen="Update your account" /> 
                    </div>
                </div>
                   
                </>)

            case "Check in":
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender} handlePlayer={this.props.handlePlayer}/>
                    <div className="checkin-content-area">
			            <div className="todo-list-wrapper">
                        <BlogForm 
                            clearBlog={this.clearBlog}
                            blogID={!!this.state.blogID ? this.state.blogID : null} 
                            handleHomeRender={this.handleHomeRender}/> 
                        </div>
                    </div>
                </>)

            case "All Blogs":
                return (
                    <>
                    <TopNav handleHomeRender={this.handleHomeRender} handlePlayer={this.props.handlePlayer}/>
                   
                    <div className="home-content-area">
			            <div className="wrapper">
                        <h2 id="logo-font">Today.</h2>
                        {this.state.otherUserId ? <h1>{this.state.otherUserName}'s Blogs</h1> : <h1>All Blogs</h1>}
                        {this.state.otherUserId ? 
                            <BlogContainer 
                            handleOtherUserRender={this.handleOtherUserRender}
                            blogs={this.filterOtherUserBlogs()} 
                            likedBlogs={this.props.likedBlogs} 
                            handleHomeRender={this.handleHomeRender}/>
                        :
                            <BlogContainer 
                            handleOtherUserRender={this.handleOtherUserRender}
                            blogs={this.filterPublicBlogs()} 
                            likedBlogs={this.props.likedBlogs} 
                            handleHomeRender={this.handleHomeRender}/>}
                    </div>
                    </div>
                    </>)

            case "Liked Blogs":
                return (
                    <>
                    <TopNav handleHomeRender={this.handleHomeRender} handlePlayer={this.props.handlePlayer}/>
                   
                    <div className="home-content-area">
			            <div className="wrapper">
                        <h2 id="logo-font">Today.</h2>
                        <h1>Liked Blogs</h1>

                        {this.filterLikedBlogs().length === 0 ? <h3>Nothing to see here, go ahead and <FontAwesomeIcon icon={faThumbsUp} size="1x"/> some blogs!</h3> : null}
                            
                        <BlogContainer 
                        handleOtherUserRender={this.handleOtherUserRender}
                        blogs={this.filterLikedBlogs()} 
                        likedBlogs={this.props.likedBlogs} 
                        handleHomeRender={this.handleHomeRender}/>
                        </div>
                    </div>
                   
                    </>)

            case "To-do":
                return( 
                    <>
                    <TopNav handleHomeRender={this.handleHomeRender} handlePlayer={this.props.handlePlayer}/>

                    <div className="todo-content-area">
			            <div className="todo-list-wrapper">
                        <h2 id="logo-font">Today.</h2>
                        <h1>To-do Lists</h1>

                        <ListContainer/>
                        </div>
                    </div>
                    </> 
                )

            default :
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender} handlePlayer={this.props.handlePlayer}/>
                  
                    {this.props.newUser ? this.handleOpenModal() : null}
                    <div className="home-content-area">
			            <div className="wrapper">
                        <h2 id="logo-font">Today.</h2>
                        <h1 >Hello, {this.props.user.name}!{" "} {this.state.advice}</h1>
                        {/* <h1></h1> */}
                       
                    {this.filterUserBlogs().length === 0 ?
                    <div> 
                        <h3>Looks like you don't have any check-ins yet, click {" "}
                            <Button variant="secondary" onClick={() => this.handleHomeRender("Check in")}> Here </Button> to get started</h3>
                    </div> 
                    : null}
                    
                    <BlogContainer 
                        blogs={this.filterUserBlogs()} 
                        likedBlogs={this.props.likedBlogs} 
                        handleHomeRender={this.handleHomeRender}/>
                        </div>
                        </div>

                    { this.state.modalNewUser ?
                    <NewUserModal
                        closeModal={this.closeModal}
                        openModal={this.state.openNewUserModal}
                    /> : null }
                    
                </>)
        }
    }
}

const mapStateToProps = state => {
    // debugger
    return {
        user: state.user,
        allBlogs: state.allBlogs,
        likedBlogs: state.likedBlogs,
        newUser: state.newUser
       
    } 
}

export default connect(mapStateToProps, {fetchUser, fetchBlogs, fetchLikedBlogs, oldUser, fetchLists})(Home);
