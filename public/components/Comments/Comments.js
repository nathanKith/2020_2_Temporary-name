import CommentsHbs from './Comments.hbs'
import CommentsComment from './CommentsComment.hbs'
import CommentsSend from './CommentsSend.hbs'
import './ChatContent.css'

export class Comments {
    #parent
    #data

    constructor(parent) {
        this.#parent = parent;
    }

    set data(data){
        this.#data = data;
    }

    render = () => {
        this.#parent.innerHTML = '';
        this.#parent.insertAdjacentHTML('beforeend', CommentsHbs());
        const comments = document.getElementById('comments');
        this.#data.comments.forEach( (comment) => {
            const user = this.#data.users.filter( (user) => user.id === comment.id )
            comments.insertAdjacentHTML('beforeend', CommentsComment({
                commentText: comment.commentText,
                avatar: user[0].linkImages[0],
                name: user[0].name,
                timeDelivery: comment.timeDelivery,
            }));
        } )



    }
}
// {
//     data: {
//         comments: [
//             {
//                 просто добавить юзермодель в комменты
//                 user: UserModel,
//                 commentText: '',
//                 timeDelivery: '7:27',
//             },
//             {
//                 user_id: '2',
//                 commentText: '',
//                 avatar: 'link',
//                 name: 'person',
//                 timeDelivery: '7:27',
//             }
//         ],
//         users: [
//             {
//                 User: 'UserModel',
//             },
//             {
//                 User: 'UserModel',
//             },
//         ]
//
//     }
// }