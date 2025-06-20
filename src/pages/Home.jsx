import { useIntl } from "react-intl";
import './Home.scss'
import { useEffect, useRef, useState } from "react";
import Request from "../utils/Request";
import Loader from "../components/Loader";
import PokemonCase from "../components/PokemonCase";
import Input from "../components/Input";
import PokemonPopup from "../components/PokemonPopup";
import InfiniteScroll from 'react-infinite-scroll-component';

// <InfiniteScroll
//   dataLength={items.length} //This is important field to render the next data
//   next={fetchData}
//   hasMore={true}
//   loader={<h4>Loading...</h4>}
//   endMessage={
//     <p style={{ textAlign: 'center' }}>
//       <b>Yay! You have seen it all</b>
//     </p>
//   }
//   // below props only if you need pull down functionality
//   refreshFunction={this.refresh}
//   pullDownToRefresh
//   pullDownToRefreshThreshold={50}
//   pullDownToRefreshContent={
//     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
//   }
//   releaseToRefreshContent={
//     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
//   }
// >
//   {items}
// </InfiniteScroll>

const Home = (props) => {
    const intl = useIntl()

    const [data, setData] = useState([])
    const [dataLength, setDataLength] = useState(0)
    const [page, setPage] = useState("0")
    const [pageSize, setPageSize] = useState("0")
    const [search, setSearch] = useState("")
    const [fetching, setFetching] = useState(false)

    const ref = useRef()

    let timeout = useRef()
    let inputTimeout = useRef()

    useEffect(()=>{
        clearTimeout(inputTimeout.current)
        setFetching(true)
        inputTimeout.current = setTimeout(()=>{
            fetchPokemons({name:search}, true)
        }, 300)
    }, [search])

    const fetchPokemons = (filters, reset=false) => {
        Request.post('/pokemon/filter/'+(reset ? 0 : page), filters).then((res) => {
            console.log(res)
            setPage(reset ? 1 : Number(res.page) + 1)
            if(res.pageSize !== pageSize) setPageSize(res.pageSize)
            if(res.total !== dataLength) setDataLength(res.total)
            timeout.current = setTimeout(()=>{
                setData(reset ? res.data : [...data, ...res.data])
                setFetching(false)
            }, 1500)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchPokemons()

        return () => {
            clearTimeout(timeout.current)
            clearTimeout(inputTimeout.current)
        }
    }, [])

    const handlePokemonClick = (pokemon) => {
        props.changePopupState(true, <PokemonPopup pokemon={pokemon} closePopup={closePopup}/>)
    }

    const closePopup = () => {
        props.changePopupState(false)
    }

    return (
        <div className="Home">
            <div className="HomeContainer" ref={ref} id={"scrollableDiv"}>
                <div className="SearchContainer">
                    <Input placeholder={"search-pokemon"} type={'search'} value={search} onChange={(e)=>{setSearch(e)}}/>
                </div>
                {!data || fetching ? <Loader/>
                : 
                <>
                    <div className="PokemonList">
                        {data.map((pokemon, idPokemon) => (
                            <PokemonCase key={'Pokemon-'+idPokemon} {...pokemon} onClick={()=>handlePokemonClick(pokemon)}/>
                        ))}
                        <InfiniteScroll
                            dataLength={data.length} //This is important field to render the next data
                            next={()=>fetchPokemons()}
                            hasMore={data.length !== dataLength}
                            loader={ <div className="LoadingScroll">
                                <Loader withoutText/>
                            </div> }
                            scrollableTarget="scrollableDiv"
                        >
                        </InfiniteScroll>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default Home