import React from 'react'

const ReadTable = ({posts, handleEditPostForm}) => {
    return (
        <>
        {/* Maps the data in the data base to the table */}
          {posts.map((post) => 
          <tr key = {post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.date}</td>
            <td>{post.reporter}</td>
            <td>{post.assignedTo}</td>
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
