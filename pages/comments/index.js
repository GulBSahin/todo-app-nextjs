import {useState} from 'react'

export default function CommentsPage() {

    const [comments, setComments] = useState([]);  // array of comments that will be display on the page
    const [comment, setComment] = useState('');  // comment that will be added to the array
    
    const fetchComments = async () => { // fetch comments from the api
        const response = await fetch('/api/tasks')
        const data = await response.json()
        setComments(data)
    }

    const submitComment = async (e) => { // submit comment to the api
        e.preventDefault()
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({title: comment, memo: 'default memo', checked: false, pinned: false}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <div>
            {/* this about input field to adding data to db */}
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button onClick={submitComment}>Submit Comments</button>
            {/* these about fetching data and displaying it on the screen */}
            <button onClick={fetchComments}>Load Comments</button>
            {comments.map((comment) => {
                    return(
                        <div key={comment.id}>
                            <h3>{comment.title}</h3>
                            <p>{comment.memo}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}


















// import {useState} from 'react'

// export default function CommentsPage() {

//     const [comments, setComments] = useState([]);  // array of comments that will be display on the page
//     const [comment, setComment] = useState('');  // comment that will be added to the array
    
//     const fetchComments = async () => { // fetch comments from the api
//         const response = await fetch('/api/tasks')
//         const data = await response.json()
//         setComments(data)
//     }

//     const submitComment = async (e) => { // submit comment to the api
//         e.preventDefault()
//         const response = await fetch('/api/tasks', {
//             method: 'POST',
//             body: JSON.stringify({title: comment, memo: 'default memo', checked: false, pinned: false}),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         const data = await response.json()
//         console.log(data)
//     }

//     return (
//         <div>
//             {/* this about input field to adding data to db */}
//             <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
//             <button onClick={submitComment}>Submit Comments</button>
//             {/* these about fetching data and displaying it on the screen */}
//             <button onClick={fetchComments}>Load Comments</button>
//             {comments.map((comment) => {
//                     return(
//                         <div key={comment.id}>
//                             <h3>{comment.title}</h3>
//                             <p>{comment.memo}</p>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }
