import React, {useState,useEffect} from 'react'
import nextId from "react-id-generator"
import ReadTable from './ReadTable'
import axios from 'axios'




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

    title: '',
    bug_description: '',
    due_date: '',
    assigned_to: '',
    reporter: '',
    severity :'',
    bug_status: ''

  })

  //Get the id 
  const [editPostId, setEditPostId]=useState(null)

  const [editFormData, setEditFormData] = useState({
    
    title: '',
    bug_description: '',
    due_date: '',
    assigned_to: '',
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
      bug_description: post.bug_description,
      due_date: post.due_date,
      assigned_to: post.assigned_to,
      severity : post.severity,
      bug_status: post.bug_status
    }
    setEditFormData(formValues)
  }

  //save form data
  const handleFormSave = (e) => {
    e.preventDefault()

    const savePost = {
    
      title: editFormData.title,
      bug_description: editFormData.bug_description,
      due_date: editFormData.due_date,
      assigned_to: editFormData.assigned_to,
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
      
      title: addPost.title,
      bug_description: addPost.bug_description,
      due_date: addPost.due_date,
      assigned_to: addPost.assigned_to,
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
    deleteBugs(formIndex)
  }


  //Post Request
  const createBug = (data) =>{
    
  axios.post("http://bugtracker-env.eba-cnmv7y5g.us-east-2.elasticbeanstalk.com/create-bug",data ,yourConfig)
      .then(res => console.log(res.data) )
       .catch(error => console.log(error))

   
   }


   const deleteBugs = (id) =>{ 
    axios.delete("http://bugtracker-env.eba-cnmv7y5g.us-east-2.elasticbeanstalk.com/delete-bug",{ data: { "id": "id" } },yourConfig)
    .then(res => console.log(res.data) )
     .catch(error => console.log(error))

 }

    //Search Data
    const [searchQuery, setSearchQuery] = useState("")
    function search() {
      return posts.filter(row => row.title.toLowerCase().indexOf(searchQuery) > - 1)
  
    }

      //Get Data From JSON Placeholder
      const fetchUrl = "http://bugtracker-env.eba-cnmv7y5g.us-east-2.elasticbeanstalk.com/get-bugs"
      useEffect(() => {
  
        axios.get(fetchUrl, yourConfig)
        .then(res => setPosts(res.data))
  
  
        
      
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
            <th scope="col">Bug Description</th>
            <th scope="col">Date</th>
            <th scope="col">Assigned To</th>
           
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
                    //name="id"
                    //placeholder={addPost.userId}
                    required
                    //onChange={handleChange("id")}
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
                  <label className="form-label">Bug Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bug_description"
                    placeholder="bug_description"
                    required
                    onChange={handleChange("bug_description")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date" //yyyy-mm-dd
                    
                    className="form-control"
                    name="due_date"
                    required
                    onChange={handleChange("due_date")}
                  /> 
                </div>
                <div className="mb-3">
                  <label className="form-label">Assigned To</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assigned_to"
                    placeholder="assigned_to"
                    required
                    onChange={handleChange("assigned_to")}
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
                    //name="id"
                    //value={editFormData.id}
                    required
                    //onChange={handleEditChange("id")}
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
                  <label className="form-label">Bug Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bug_description"
                    value={editFormData.bug_description}
                    required
                    onChange={handleEditChange("bug_description")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="due_date"
                    value={editFormData.due_date}
                    required
                    onChange={handleEditChange("due_date")}
                  /> 
                </div>
                <div className="mb-3">
                  <label className="form-label">Assigned To</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assigned_to"
                    value={editFormData.assigned_to}
                    required
                    onChange={handleEditChange("assigned_to")}
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