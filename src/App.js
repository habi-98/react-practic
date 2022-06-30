import React, {useEffect, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter"
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import {getPageCount} from './utils/pages'
import axios from "axios";
import PostServer from "./API/PostServer";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {usePagination} from "./hooks/usePagination";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAdnSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const pagesArray = usePagination(totalPage)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostServer.getAll(limit, page)
        console.log(response.headers['x-total-count'])
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPage(getPageCount(totalCount, limit))
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <div className="App">
            <MyButton onClick={() => setModal(true)} style={{marginTop: '20px'}}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisble={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Произошла ошибка {postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAdnSearchedPosts} title={'Список постов 1'}/>

            }
        </div>
    );
}

export default App;
