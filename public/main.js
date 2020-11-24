import './styles.css';

import {LandingView} from './views/LandingView';
import {Feed} from './components/Feed/Feed.js';
import {ProfileChatIcon} from './components/ProfileChatIcon/ProfileChatIcon.js'
import {Profile} from './components/Profile/Profile.js'
import {Chats} from './components/Chats/Chats.js';
import {Registration} from "./components/Registration/Registration.js";
import {Authorization} from "./components/Authorization/Authorization.js";
import {ajax} from './modules/ajax.js';
import {LandingController} from "./controllers/LandingController";
import {LandingHeader} from "./components/LandingHeader/LandingHeader";
import {RegistrationView} from "./views/RegistrationView";
import {Router} from "./modules/router";
import {RegAuthModel} from "./models/RegAuthModel";
import {RegistrationController} from "./controllers/RegistrationController";
import {AuthorizationView} from "./views/AuthorizationView";
import {AuthorizationController} from "./controllers/AuthorizationController";
import {FeedView} from "./views/FeedView";
import {UserModel} from "./models/UserModel";
import {UserListModel} from "./models/UserListModel";
import {ChatListModel} from "./models/ChatListModel";
import {FeedController} from "./controllers/FeedController";
import {CommentListModel} from './models/CommentListModel';
import {ProfileMobileView} from "./views/ProfileMobileView";
import {ProfileMobileController} from "./controllers/ProfileMobileController";

const application = document.querySelector('#application');

const landingView = new LandingView(application);
const registrationView = new RegistrationView(application);
const authorizationView = new AuthorizationView(application);
const feedView = new FeedView(application);
const profileMobileView = new ProfileMobileView(application);

const regAuthModel = new RegAuthModel();
const authorizationModel = new RegAuthModel();
const userModel = new UserModel();
const userListModel = new UserListModel();
const chatListModel = new ChatListModel();
const commentListModel = new CommentListModel();

const landingController = new LandingController(landingView);
const registrationController = new RegistrationController(registrationView, regAuthModel);
const authorizationController = new AuthorizationController(authorizationView, authorizationModel);
const feedController = new FeedController(feedView, userModel, userListModel, chatListModel, commentListModel);
const profileMobileController = new ProfileMobileController(profileMobileView, userModel);

export const router = new Router();

const doLanding = () => {
    landingController.control();
}

const doRegistration = () => {
    registrationController.control();
}

const doAuthorization = () => {
    authorizationController.control();
}

const doFeed = () => {
    feedController.control();
}

const doProfileMobile = () => {
    profileMobileController.control();
}


router.add('/', doLanding);
router.add('/signup', doRegistration);
router.add('/login', doAuthorization);
router.add('/feed', doFeed);

// router.add('/m/feed', )
// router.add('/m/comments', );
// router.add('/m/chats', );
router.add('/m/profile', doProfileMobile);

router.start();

// window.onresize = (evt) => {
//     if (document.documentElement.clientWidth < 1024) {
//         const app = document.getElementById('application');
//         app.innerHTML = '';
//     }
// }
