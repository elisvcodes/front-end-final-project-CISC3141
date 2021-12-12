import React from 'react'

const ReadTable = ({posts, handleEditPostForm}) => {
    return (
        <>
        {/* Maps the data in the data base to the table */}
          {posts.map((post,index) => 
          <tr key = {index}>
            <td>{index + 1}</td> 
            <td>{post.title}</td>
            <td>{post.bug_description}</td>
            <td>{post.due_date}</td>
            <td>{post.assigned_to}</td>
          
            <td>{post.severity}</td>
            <td> {post.bug_status}</td>
            
            <td>          
            <button type="button" className="me-3 btn btn-primary ml-auto d-block mb-2" 
              data-bs-toggle="modal" 
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e,post)}>
              Edit
            </button></td>
          </tr>
          )}
        </>
    )
}

export default ReadTable
