import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Pagination from './Pagination'

function Movies() {
    const[movies, setMovies] = useState([])
    const[pageNum, setPageNum] = useState(1)
    const[watchList, setWatchList] = useState([])
    const[hovered, setHovered] = useState('')

    // watchList handler

    const addToWatchList =(movie)=>{
       const newWatchList = [...watchList, movie]
       setWatchList(newWatchList)
       localStorage.setItem('imdb', JSON.stringify(newWatchList))
       
    }

    const removeFromWatchList =(movie)=>{
      const filteredWatchList = watchList.filter((m)=>{
          return (m.id !== movie.id)
      })
      setWatchList(filteredWatchList)
      localStorage.setItem('imdb', JSON.stringify(filteredWatchList))

    }

    console.log(watchList)

    // Hovering on movies

    const showButton =(id)=>{
      setHovered(id)
    }

    const hideButton =()=>{
       setHovered('')
    }

    // Pagination handler

    // for next page
    const onNext =()=>{
      setPageNum(pageNum+1)
    }

    // for prev page
    const onPrev =()=>{
      if(pageNum>1){
        setPageNum(pageNum-1)
      }
    }

    useEffect(()=>{
        
        (function(){

          let moviesFromLS = localStorage.getItem('imdb')
          moviesFromLS = JSON.parse(moviesFromLS) || []
          setWatchList(moviesFromLS)
          
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e3a2b5d7ece779b6ec37513408bf162c&page=${pageNum}`).then((res)=>{
                 console.log(res.data.results)
                 setMovies(res.data.results)
            })
        })()
    },[pageNum])
  return (
    <div className='bg-gray-800'>
        <div className='text-2xl mb-8 pt-10 font-bold text-center text-yellow-600'>
          Trending... Movies
        </div>

        <div className='flex flex-wrap cursor-pointer'>
          {movies.map((movie)=>{
               return   <div 
               
               onMouseOver={()=>showButton(movie.id)}
               onMouseLeave={()=>hideButton()}

               key={movie.id}
               
               className='w-[160px] h-[35vh] bg-center bg-cover rounded-xl m-4 md:h[40vh] md:w[200px] hover:scale-110 duration-300 relative flex items-end' 
               style={{
                   backgroundImage : `URL(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
               }}>

              <div className='text-white font-bold text-center w-full bg-gray-900 bg-opacity-60'>
                {movie.title}
              </div>

              <div className='text-2xl p-2'
              style={{display : hovered===movie.id ? 'block' : 'none'}}>
               {watchList.includes(movie)===false ? ( <div onClick={()=>addToWatchList(movie)}>✅</div>) : 
               (<div onClick={()=>removeFromWatchList(movie)}>❌</div>)}
              
              </div>
                  
               </div>
          })}

          

            

           

            
        </div>

        <Pagination 
           onPrevProp={onPrev}
           pageNumProp={pageNum}
           onNextProp={onNext}
        >
        
        </Pagination>
    </div>
  )
}

export default Movies