import ProfileSide from '../../components/profileSide/ProfileSide';
import './Home.css';

const Home = () => {
    return (
        <div className="Home">
            <ProfileSide/>
            <div className="postSide">posts</div>
            <div className="rightSide">rightSide</div>
        </div>
    );
};

export default Home;