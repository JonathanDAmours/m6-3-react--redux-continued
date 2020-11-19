import React, { useEffect } from "react";
import { BsPlayFill } from "react-icons/bs";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtistData,
  receiveArtistData,
  receiveArtistDataError,
} from "../../actions";
import ScaleLoader from "react-spinners/ScaleLoader";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  let currentArtist = useSelector((state) => state.artists.currentArtist);
  const { artistId } = useParams();

  console.log(currentArtist);

  const handleFetch = async () => {
    try {
      await dispatch(requestArtistData());
      const response = await fetchArtistProfile(token, artistId);
      await dispatch(receiveArtistData(response));
    } catch (err) {
      await dispatch(receiveArtistDataError());
    }
  };
  useEffect(() => {
    handleFetch();
  }, [token]);
  useEffect(() => {
    console.log(currentArtist);
  }, [currentArtist]);
  if (currentArtist) {
    currentArtist = currentArtist.profile;
  }

  const numberShorten = (num) => {
    const splitNum = num.toString().split("");
    switch (splitNum.length) {
      case 1 || 2 || 3:
        return num;
      case 4:
        return `${splitNum[0]}.${splitNum[1]}k`;
      case 5:
        return `${splitNum[0]}${splitNum[1]}.${splitNum[2]}k`;
      case 6:
        return `${splitNum[0]}${splitNum[1]}${splitNum[2]}k`;
      case 7:
        return `${splitNum[0]}.${splitNum[1]}m`;
      case 8:
        return `${splitNum[0]}${splitNum[1]}.${splitNum[2]}m`;
      case 9:
        return `${splitNum[0]}${splitNum[1]}${splitNum[2]}m`;
      default:
        return;
    }
  };

  console.log(currentArtist);
  return (
    <Main>
      {!currentArtist ? (
        <>
          <Loading>
            <StyledScaleLoader color={"#FFFFFF"} />
          </Loading>
        </>
      ) : (
        <Wrapper>
          <Header>
            <Avatar>
              <Image src={currentArtist.images[0].url} alt="Eartheater" />
              <Name>{currentArtist.name}</Name>
              <Followers>
                {numberShorten(currentArtist.followers.total)}
                <Span> followers</Span>
              </Followers>
            </Avatar>
            <Tracks>
              <Top>top tracks</Top>
              <PlaySection>
                <PlayBtns>
                  <StyledBsPlayFill></StyledBsPlayFill>
                </PlayBtns>
                <PlayBtns>
                  <StyledBsPlayFill></StyledBsPlayFill>
                </PlayBtns>
                <PlayBtns>
                  <StyledBsPlayFill></StyledBsPlayFill>
                </PlayBtns>
              </PlaySection>
            </Tracks>
          </Header>
          <Tags>
            <Tag>tags</Tag>
            <GenreDiv>
              <Genre>{currentArtist.genres[0]}</Genre>
              <Genre>{currentArtist.genres[1]}</Genre>
            </GenreDiv>
          </Tags>
        </Wrapper>
      )}
    </Main>
  );
};
const StyledScaleLoader = styled(ScaleLoader)`
  transition-delay: 5s;
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0b0f14;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Genre = styled.h1`
  margin: 0 8px;
  background-color: rgba(75, 75, 75, 0.4);
  color: white;
  font-weight: 600;
  font-size: 11px;
  padding: 8px 20px;
  border-radius: 4px;
`;

const GenreDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const Tags = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
`;

const Tag = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 21px;
`;

const Main = styled.div`
  background-color: #0b0f14;
  font-family: "Montserrat", sans-serif;
`;

const Wrapper = styled.div`
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
  padding: 59px 0 0 0;
`;

const Avatar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 175px;
`;

const Image = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
`;

const Name = styled.h1`
  color: white;
  font-weight: 700;
  font-size: 48px;
  position: absolute;
  top: 114px;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const Followers = styled.p`
  margin-top: 23px;
  color: #ff4fd8;
  font-size: 14px;
  font-weight: 600;
`;

const Span = styled.span`
  color: white;
`;

const Tracks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 104px;
`;

const Top = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 21px;
`;

const PlaySection = styled.div`
  margin-top: 24px;
  width: 174px;
  display: flex;
  justify-content: space-between;
`;

const PlayBtns = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: rgba(75, 75, 75, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBsPlayFill = styled(BsPlayFill)`
  color: white;
  height: 26px;
  width: 26px;
`;

export default ArtistRoute;
