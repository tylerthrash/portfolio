import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import profilePic from '../../../assets/imgs/tyler-thrash-profile-picture-1-circle-cropped.webp';
import useBreakpoints from '../../../hooks/getWindowDimensions';
import { getStylesObj } from '../../../utils/common-react.util';
import { isDefined } from '../../../utils/common.util';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const HomeHeader = () => {
  const breakpoint = useBreakpoints();
  const [name, setName] = useState('Tyler Thrash'.split(''));
  const [nameElements, setNameElements] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    setNameElements(
      name.map((letter, i) => {
        const classes = isDefined(letter)
          ? 'animated-el animated rubberBand'
          : '';

        return (
          <span key={i} className={classes}>
            {letter}
          </span>
        );
      })
    );
  }, [name]);

  const openLinkInNewTab = (e, url) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const newWindow = window.open(url, '_blank', 'noopener');
    if (newWindow) newWindow.opener = null;
  };

  const copyEmailToClipboard = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText('tyler.thrash47@gmail.com');
    setOpenSnackbar(true);
  };

  const profilePicSize = breakpoint.isXXSmallHandset ? 275 : 300;

  return (
    <>
      <div className="home-header">
        <Image
          src={profilePic}
          alt="Tyler Thrash Profile Picture"
          width={profilePicSize}
          height={profilePicSize}
          priority
        />
        <div className="home-header-desc">
          <h1 className="title">{nameElements}</h1>
          <div className="sub-title">
            <div>👋 Hello!</div>
            <div>
              I like building frictionless software systems that empower and
              enrich people's lives!
            </div>
            <div className="home-header-emojis">🖥️🧠⚛️</div>
          </div>
          <div className="home-header-links">
            <IconButton
              onClick={(e) =>
                openLinkInNewTab(e, 'https://github.com/tylerthrash')
              }
            >
              <GitHubIcon className="medium-icon-size icon-dark" />
            </IconButton>

            <IconButton
              onClick={(e) =>
                openLinkInNewTab(e, 'https://twitter.com/tylerthrash1')
              }
            >
              <TwitterIcon
                className="medium-icon-size icon-dark"
                style={getStylesObj('color: hsl(203, 89%, 53%)')}
              />
            </IconButton>

            <IconButton
              onClick={(e) =>
                openLinkInNewTab(e, 'https://linkedin.com/in/tylerthrash')
              }
            >
              <LinkedInIcon
                className="medium-icon-size icon-dark"
                style={getStylesObj('color: hsl(210, 90%, 40%)')}
              />
            </IconButton>

            <IconButton onClick={(e) => copyEmailToClipboard()}>
              <EmailIcon className="medium-icon-size icon-dark" />
            </IconButton>
          </div>
        </div>
      </div>
      {breakpoint.isHandset === false && <hr />}


      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <div style={getStylesObj("font-size: 1.6rem")}>Email Copied to Clipboard!</div>
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomeHeader;
