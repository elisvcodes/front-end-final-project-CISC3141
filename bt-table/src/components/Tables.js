import React, {useState,useEffect} from 'react'
import nextId from "react-id-generator"
import ReadTable from './ReadTable'
import axios from 'axios'
import moment from 'moment'



const Tables = () => {

  const yourConfig = {
    headers: {
       Authorization: `Bearer ${
    JSON.parse(localStorage.getItem('auth')).jwtToken
    }`
  }
  }

  const[posts,setPosts] = useState([])

  const[addPost, setAddPost] = useState({
    id: 10,
    title: '',
    date: '',
    assignedTo: '',
    reporter: '',
    severity :'',
    bug_status: ''

  })

  //Get the id 
  const [editPostId, setEditPostId]=useState(null)

  const [editFormData, setEditFormData] = useState({
    id: 10,
    title: '',
    date: '',
    assignedTo: '',
    reporter: '',
    severity :'',
    bug_status: ''
  })

  //Edit data value
  const handleEditChange = (input) => (e) => {
    e.preventDefault()
    setEditFormData({...editFormData, [input] : e.target.value})
  }

  

  //edit modal data
  const handleEditPostForm = (e, post) => {
    e.preventDefault()
    setEditPostId(post.id)

    const formValues = {
      title: post.title,
      date: post.date,
      assignedTo: post.assignedTo,
      reporter: post.reporter,
      severity : post.severity,
      bug_status: post.bug_status
    }
    setEditFormData(formValues)
  }

  //save form data
  const handleFormSave = (e) => {
    e.preventDefault()

    const savePost = {
      id : editPostId,
      title: editFormData.title,
      date: editFormData.date,
      reporter: editFormData.reporter,
      assignedTo: editFormData.assignedTo,
      severity : editFormData.severity,
      bug_status: editFormData.bug_status

    }

    const newPosts = [...posts]
    const formIndex = posts.findIndex((post) => post.id === editPostId)
    newPosts[formIndex] = savePost

    setPosts(newPosts) 
    setEditPostId(null)
    console.log(editPostId);
  }


  //Getter for form values
  const handleChange = (input) => (e) => {
    e.preventDefault()
    console.log(addPost)
    setAddPost({...addPost, [input]: e.target.value })
  }

 

  //Add data to the table
  const handleAddPost = (e) => {
    e.preventDefault()

    const newPost ={
      id: nextId(),
      title: addPost.title,
      date: addPost.date,
      reporter: addPost.reporter,
      assignedTo: addPost.assignedTo,
      severity : addPost.severity,
      bug_status: addPost.bug_status
    }

    const newPosts = [...posts,newPost]
    setPosts(newPosts)
    createBug(newPost)
  }

  //Delete data

  const handleDelete = (e) => {
    e.preventDefault()

    const newPosts = [...posts]
    const formIndex = posts.findIndex((post) => post.id === editPostId)

    newPosts.splice(formIndex,1);
    setPosts(newPosts)
  }


  //Post Request
  const createBug = (bug) =>{
      axios.post("http://bugtracker-env.eba-cnmv7y5g.us-east-2.elasticbeanstalk.com/create-bug",bug ,yourConfig)
      .then(res => console.log(res.data) )


  }


    //Search Data
    const [searchQuery, setSearchQuery] = useState("")
    function search() {
      return posts.filter(row => row.title.toLowerCase().indexOf(searchQuery) > - 1)
  
    }


   
   

    //Get Data From JSON Placeholder
    const fetchUrl = "http://bugtracker-env.eba-cnmv7y5g.us-east-2.elasticbeanstalk.com/get-bugs"
    useEffect(() => {

      // axios.get(fetchUrl, yourConfig)
      // .then(res => setPosts(res.data))

// 
//       axios.interceptors.request.use((req) => {
//         if (localStorage.getItem('auth')) {
//           req.headers.authorization = `Bearer ${
//             JSON.parse(localStorage.getItem('auth')).jwtToken
//           }`;
//           console.log(req);
//         }
//         console.log(req);
//         return req;
//       });
    
      async function fetchData() {
      const data = await axios.get(fetchUrl,yourConfig)
      setPosts(data.data)
      console.log(data.data);
      
      }

      fetchData()
    }, [])

  
 
  
    console.log(posts);
  return (
    <div>
        <div className="d-flex flex-row">
          <button type="button" className="me-3 btn btn-secondary ml-auto d-block mb-2 " 
          data-bs-toggle="modal" 
          data-bs-target="#addModalForm">
            Add Bug +
          </button>

          <form className="row g-3 ms-auto">
          <div className="col-auto">
            <input
              type="text"
              className="form-control ms-auto"
              placeholder="search data"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        </div>

        
      <table className="table  table-responsible">
        <thead>
          <tr>
            {/*All the colums in the rows*/}
            <th scope="col">ID</th>
            <th scope="col">Bug Title</th>
            
            <th scope="col">Date</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Reporter</th>
            <th scope="col">Severity</th>
            <th scope="col">Bug Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
    
          <ReadTable
            posts = {search(posts)}
            handleEditPostForm = {handleEditPostForm}
          />
          
          
        </tbody>
      </table>


       {/*Add Modal */}
       <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Bug</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    placeholder={addPost.userId}
                    required
                    onChange={handleChange("id")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bug Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="title"
                    required
                    onChange={handleChange("title")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date" //yyyy-mm-dd
                    
                    className="form-control"
                    name="date"
                    required
                    onChange={handleChange("date")}
                  /> 
                </div>
                <div className="mb-3">
                  <label className="form-label">Assigned To</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assignedTo"
                    placeholder="assignedTo"
                    required
                    onChange={handleChange("assignedTo")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reporter Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reporter"
                    placeholder="reporter"
                    required
                    onChange={handleChange("reporter")}
                  />
                </div>
              
                <div className="mb-3">
                  <label className="form-label">Severity</label>
                  <input
                    type="text"
                    className="form-control"
                    name="severity"
                    placeholder="severity"
                    required
                    onChange={handleChange("severity")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bug Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bug_status"
                    placeholder="bug_status"
                    required
                    onChange={handleChange("bug_status")}
                  />
                </div>

                <div className="modal-footer d-block">
                <button type="submit" data-bs-dismiss="modal" className="btn btn-warning float-end">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

            {/*Edit Row Modal */}
      <div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Row</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
              <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    value={editFormData.id}
                    required
                    onChange={handleEditChange("id")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bug Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={editFormData.title}
                    required
                    onChange={handleEditChange("title")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={editFormData.date}
                    required
                    onChange={handleEditChange("date")}
                  /> 
                </div>
                <div className="mb-3">
                  <label className="form-label">Assigned To</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assignedTo"
                    value={editFormData.assignedTo}
                    required
                    onChange={handleEditChange("assignedTo")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reporter Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reporter"
                    value={editFormData.reporter}
                    required
                    onChange={handleEditChange("reporter")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Severity</label>
                  <input
                    type="text"
                    className="form-control"
                    name="severity"
                    value={editFormData.severity}
                    required
                    onChange={handleEditChange("severity")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bug Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bug_status"
                    value={editFormData.bug_status}
                    required
                    onChange={handleEditChange("bug_status")}
                  />
                </div>
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success float-end"
                  >Save Row</button>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger float-start"
                    onClick={handleDelete}
                  >Delete Row</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tables