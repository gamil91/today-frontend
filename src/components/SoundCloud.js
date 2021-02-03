import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import Draggable from 'react-draggable'

const SoundCloud = ({handleClose}) => {


    return (
        <Draggable handle=".move-player" >
            <div  id="footer">
                <script src="https://connect.soundcloud.com/sdk/sdk-3.3.2.js"></script>

                <iframe title="unique" width="450" height="300" scrolling="no"  allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/363471011&color=%237ca49c&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
                <div>
                    <i onClick={handleClose}><FontAwesomeIcon icon={faTimes} size="2x" className="exit-player d-flex justify-content-center" /></i>
                </div>
                <div>
                    <i><FontAwesomeIcon icon={faArrowsAlt} size="2x" className="move-player d-flex justify-content-center" /></i>
                </div>
            </div>
        </Draggable>
    );
}

export default SoundCloud;

