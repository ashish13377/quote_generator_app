import React, { useState, useEffect } from 'react';
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Perloader from '../assets/preloader';
import { addBookmarks } from '../redux/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

export default function Home() {

    const notify = () => toast("Your Quote Added To Bookmarks!");

    // Proper loading indicators while an API call is made
    const [loading, setLoading] = useState(false);

    // Using state to keep track of what the selected Keys is
    const [keys, setKey] = useState(" ");

    // Using this function to update the state of keys
    // whenever a new option is selected from the dropdown
    const handleChange = (e) => {
        setKey(e.target.value);
    };

    const dispatch = useDispatch();
    // http://api.quotable.io/random
    const [data, setData] = useState('');
    const [tagsname, setTagsName] = useState([]);

    // http://api.quotable.io/tags

    useEffect(() => {
        fetch("http://api.quotable.io/tags")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setTagsName(json);
            });
        setLoading(true);
    }, []);

    async function updateQuote() {
        try {

            const response = await fetch(`https://api.quotable.io/random?tags=${keys}`);
            const { statusCode, statusMessage, ...data } = await response.json();
            if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
            setData(data);
            setLoading(true);
        } catch (error) {
            // If the API request failed, log the error to console and update state
            // so that the error will be reflected in the UI.
            console.error(error);
            setData({ content: "Opps... Something went wrong" });
        }
    }

    // Run `updateQuote` once when component mounts
    React.useEffect(() => {
        updateQuote();
    }, []);

    // Do not render until the first quote is loaded
    if (!data) return null;

    return (
        <div >
            <Helmet>
                <meta charSet="utf-8" />
                <title> Quote Generator App </title>
            </Helmet>
            {loading ? (<> <div className="container text-center">
                <div className="row nav" >
                    <div className="col">
                        <Link to="/">  <h3 className='navs-link active' >Home</h3>  </Link >
                    </div >
                    <div className="col-6 nav-tab">
                    </div>
                    <div className="col">
                        <Link to="/bookmarks"> <h3 className='navs-link' >Bookmarks</h3>  </Link>
                    </div>
                </div >
            </div >

                <div className='screen'>
                    <div className='card'>
                        <div>
                            <h4 className='text'>" {data.content} " </h4>
                        </div>
                        <div className='inner-card'>
                            <div className="container text-center">
                                <div className="row">
                                    <div className="col">

                                    </div>
                                    <div className="col-md-auto">
                                        <h4 className='auth'> - {data.author} </h4>
                                    </div>
                                    <div className="col col-lg-2" style={{ with: '8.666667' }} onClick={notify}>
                                        <BsFillBookmarkPlusFill style={{ fontSize: '25px', color: 'white', cursor: 'pointer' }} onClick={() => dispatch(addBookmarks(data))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tagsBtndiv'>
                        <select className='tagsBtn custom-select' onChange={handleChange}  >
                            <option value=" "> -- Select a Tag -- </option>
                            <option value=" "> Random </option>
                            {tagsname.map((tags) => {
                                return (
                                    <option value={tags.name}>{tags.name}</option>
                                )
                            })}

                        </select>

                    </div>
                    <div className='nextBtndiv'>
                        <button type="button" class="btn btn-success nextBtn" onClick={updateQuote}>Next Quote</button>
                    </div>
                </div></>) : (<Perloader />)
            }

            <ToastContainer position="top-center" autoClose={1500} />
        </div >
    )
}

