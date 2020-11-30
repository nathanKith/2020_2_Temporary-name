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
import {ChatsMobileView} from "./views/ChatsMobileView";
import {CommentsMobileView} from "./views/CommentsMobileView";
import {ChatsMobileController} from "./controllers/ChatsMobileController";
import {SettingsMobileView} from "./views/SettingsMobileView";
import {SettingsMobileController} from "./controllers/SettingsMobileController";
import {FeedMobileView} from "./views/FeedMobileView";
import {FeedMobileController} from "./controllers/FeedMobileController";
import {CommentsMobileController} from "./controllers/CommentsMobileController";

import {isMobile, resizeListener} from "./modules/resizing";


const application = document.querySelector('#application');


const landingView = new LandingView(application);
const registrationView = new RegistrationView(application);
const authorizationView = new AuthorizationView(application);
const feedView = new FeedView(application);
const profileMobileView = new ProfileMobileView(application);
const chatsMobileView = new ChatsMobileView(application);
const commentsView = new CommentsMobileView(application);
const settingsMobileView = new SettingsMobileView(application);
const feedMobileView = new FeedMobileView(application);
const commentsMobileView = new CommentsMobileView(application);

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
const chatsMobileController = new ChatsMobileController(chatsMobileView, chatListModel, userModel);
const settingsMobileController = new SettingsMobileController(settingsMobileView, userModel);
const feedMobileController = new FeedMobileController(feedMobileView, userListModel, chatsMobileController, userModel);
const commentsMobileController = new CommentsMobileController(commentsMobileView, userModel, commentListModel);

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
    if (isMobile()) {
        router.redirect('/mfeed');
    } else {
        feedController.control();
    }
}

const doProfileMobile = () => {
    if (!isMobile()) {
        router.redirect('/feed');
    } else {
        profileMobileController.control();
    }
}

const doChatsMobile = () => {
    if (!isMobile()) {
        router.redirect('/feed');
    } else {
        chatsMobileController.control();
    }
}

const doSettingsMobile = () => {
    if (!isMobile()) {
        router.redirect('/feed');
    } else {
        settingsMobileController.control();
    }
}

const doFeedMobile = () => {
    if (!isMobile()) {
        router.redirect('/feed');
    } else {
        feedMobileController.control();
    }
}

const doCommentsMobile = (req) => {
    if (!isMobile()) {
        router.redirect('/feed');
    } else {
        commentsMobileController.control(req.parameters.userid);
    }
}


router.add('/', doLanding);
router.add('/signup', doRegistration);
router.add('/login', doAuthorization);
router.add('/feed', doFeed);

router.add('/mprofile', doProfileMobile);
router.add('/mfeed', doFeedMobile);
router.add('/mcomments/{userId}', doCommentsMobile);
router.add('/mchats', doChatsMobile);
router.add('/msettings', doSettingsMobile);

router.start();

window.onresize = resizeListener;