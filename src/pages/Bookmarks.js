import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillTrashFill } from "react-icons/bs";
import { deleteBookmarks, removeBookmarks } from '../redux/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';


export default function Bookmarks() {
  const list = useSelector((state) => state.bookmarksReducres.list);
  const dispatch = useDispatch();
  const notify = () => toast.error("Your Quote Remove To Bookmarks!");


  return (
    <div >
      <Helmet>
        <meta charSet="utf-8" />
        <title> Quote Generator App | Bookmarks</title>
      </Helmet>
      <div className="container text-center">
        <div className="row nav" >
          <div className="col">
            <Link to="/">  <h3 className='navs-link ' >Home</h3>  </Link>
          </div>
          <div className="col-6 nav-tab">
          </div>
          <div className="col">
            <Link to="/bookmarks"> <h3 className='navs-link active' >Bookmarks</h3>  </Link>
          </div>
        </div>
      </div>

      <div className='screen2'>

        {
          list.map((elem) => {
            return (
              <div className='card2' key={elem.id}>
                <div>
                  <h4 className='text'>"{elem.data.content}" </h4>
                </div>
                <div>
                  <h4 className='auth'> - {elem.data.author} </h4>
                </div>
                <div style={{ paddingTop: "10px" }} onClick={notify}>
                  <BsFillTrashFill style={{ fontSize: '25px', color: 'white' }} onClick={() => dispatch(deleteBookmarks(elem.id))} />
                </div>
              </div>
            )

          })
        }

      </div>
      <ToastContainer position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  )
}
