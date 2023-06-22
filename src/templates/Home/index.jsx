import { Component, useEffect, useCallback } from "react";

import "./styles.css"

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts/index";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { useState } from "react";


export const Home = () => {


  const [posts, setPosts] = useState([]);
  const [allPosts, setallposts] = useState([]);
  const [page, setpage] =useState(0)
  const [postsPerPage] = useState(10);
  const [searchValue, setsearchValue] = useState('');

  const filteredPosts = !!searchValue ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(     
      searchValue.toLowerCase()
    );
  })
    : posts; 

  
  
  
 const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
   
   setPosts(postsAndPhotos.slice(page, postsPerPage));
   setallposts(postsAndPhotos)
 }, []);
  
    
  useEffect(() => {
  handleLoadPosts(0, postsPerPage);
}, [handleLoadPosts, postsPerPage]);

const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nexPosts)

  setPosts(posts);
  setpage(nextPage);
  }

 const handleChange = (e) => {
    const { value } = e.target;   
   setsearchValue(value);
  }



  const noMorePosts = page + postsPerPage >= allPosts.length;

  
  return (
    <section className="container">
    <div className="search-container">
      {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
      )}
      
      <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
      />
    </div>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem Posts =( </p>
      )}


      <div className="button-container">
      {!searchValue && (
          <Button
        onClick={loadMorePosts}
        text={"Load more posts"}
        loadMorePosts={loadMorePosts}
        disabled={noMorePosts}
        />
      )}
       
      </div>      
    </section>
  );

}


// class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2,
//     searchValue: ''
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const {page, postsPerPage} =this.state
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page,postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state
//     const nextPage = page + postsPerPage;
//     const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
//     posts.push(...nexPosts)

//     this.setState({posts, page: nextPage});
//   }

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue ?
//       allPosts.filter(post => {
//         return post.title.toLowerCase().includes(     //toLowerCase para deixar maiusculos, e includes para saber e os titulos possui o searchValue
//           searchValue.toLowerCase()
//         );
//       })
//       : posts; //operador condicional ternario

//     return (
//       <section className="container">
//       <div className="search-container">
//         {!!searchValue && (
//             <h1>Search value: {searchValue}</h1>
//         )}
        
//         <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//         />
//       </div>
//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não existem Posts =( </p>
//         )}


//         <div className="button-container">
//         {!searchValue && (
//           <Button
//           text={"Load more posts"}
//           loadMorePosts={this.loadMorePosts}
//           disabled={noMorePosts}
//           />
//         )}
         
//         </div>      
//       </section>
//     );
//   }
// }

 export default Home;
