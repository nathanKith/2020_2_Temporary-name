import CommentsHbs from './Comments.hbs';
import CommentsComment from './CommentsComment.hbs';
import CommentsSend from './CommentsSend.hbs';
import './Comments.css';

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
        if (this.#data.comments) {
            this.#data.comments.forEach( (comment) => {
                comments.insertAdjacentHTML('beforeend', CommentsComment({
                    commentText: comment.commentText,
                    avatar: comment.user.linkImages[0],
                    name: comment.user.name,
                    timeDelivery: comment.timeDelivery,
                }));
            });
        }
        
        comments.insertAdjacentHTML('beforeend', CommentsSend());
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