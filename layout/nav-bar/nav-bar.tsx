import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';

interface NavItem {
  key: string;
  icon: JSX.Element;
  title: string;
  desc: string;
}

function NavBar() {
  const router = useRouter();
  const [hoverID, setHoverID] = useState<string | null>(null);
  const [hoveringInside, setOver] = useState(false);
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(true);

  // useEffect(() => {
  //   const savedIsPinnedValue = localStorage.getItem('is-navbar-pinned');

  //   if (savedIsPinnedValue === 'true') {
  //     setIsPinned(true);
  //   }
  // }, []);

  useEffect(() => {
    if (hoveringInside === true || isPinned === true) {
      setNavbarExpanded(true);
    } else {
      setNavbarExpanded(false);
      // const hID = crypto.randomUUID();
      // setHoverID(hID);
      // setTimeout(() => {
      //   const idSame = hID === hoverID;
      //   const hoverOut = hoveringInside === false;

      //   console.log(`idSame: ${idSame} - hoverOut: ${hoverOut}`);
      //   if (hID === hoverID && hoveringInside === false) {
      //     setNavbarExpanded(false);
      //   }
      // }, 1000);
    }
  }, [hoveringInside, isPinned]); // <- add empty brackets here

  const pinnedChangeHandler = (pinned: boolean) => {
    localStorage.setItem(
      'is-navbar-pinned',
      pinned === true ? 'true' : 'false'
    );
    setIsPinned(pinned);
  };

  const navItems: NavItem[] = [
    {
      key: 'about-me',
      icon: <Avatar alt="Tyler Thrash" src="/static/images/avatar/1.jpg" />,
      title: 'About Me',
      desc: '',
    },
    {
      key: 'projects',
      icon: <Avatar alt="Tyler Thrash" src="/static/images/avatar/1.jpg" />,
      title: 'Projects',
      desc: '',
    },
    {
      key: 'resume',
      icon: <Avatar alt="Tyler Thrash" src="/static/images/avatar/1.jpg" />,
      title: 'Resume',
      desc: '',
    },
    {
      key: 'blog',
      icon: <Avatar alt="Tyler Thrash" src="/static/images/avatar/1.jpg" />,
      title: 'Blog',
      desc: '',
    },
  ];

  const goToPage = (key: string) => {
    console.log(`go to ${key}`);
    router.push(`${key}`, undefined, { shallow: true });
  };

  const navItemElements = navItems.map((navItem: NavItem) => (
    <div
      key={navItem.key}
      className="nav-bar-item-container"
      onClick={() => goToPage(navItem.key)}
    >
      {navItem.icon}

      {navbarExpanded === true && <div>{navItem.title}</div>}
    </div>
  ));

  const isPinnedIconButton = (
    <IconButton
      aria-label={
        isPinned === true ? 'Pin Navigation Bar' : 'Unpin Navigation Bar'
      }
      size="large"
      color="primary"
      onClick={() => pinnedChangeHandler(!isPinned)}
    >
      {isPinned === true ? (
        <ArrowBackIosIcon style={{ color: '#F1F3F4' }} />
      ) : (
        <PushPinIcon style={{ color: '#F1F3F4' }} />
      )}
    </IconButton>
  );

  return (
    <nav
      className="nar-bar-container"
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
    >
      {/* {
        false &&
        <div className="nav-bar-header">
        {false && navbarExpanded === true && isPinnedIconButton}
      </div>
      } */}


      {navItemElements}
    </nav>
  );
}

export default NavBar;
