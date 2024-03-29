import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DevopsService from "../../services/DevopsService";
import SkillsService from "../../services/SkillsService";
import "./Devop.css";
import { createName } from "../../utils/userNameCreater";
import Carousel from "../../components/UI/Carousel/Carousel";
import Card from "../../components/Card/Card";
import ReviewsService from "../../services/ReviewsService";
import Review from "../../components/Review/Review";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../components/UI/Loader/Loader";
import CardsSection from "../../components/CardsSections/CardsSection";

const Devop = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [fetchUser, isUserLoading, userErrors] = useFetching(async (id) => {
    const response = await DevopsService.getById(id);
    setUser(response.data);
  })

  const [fetchSkills, areSkillsLoading, skillsError] = useFetching(async (id) => {
    const response = await SkillsService.getByUserId(id);
    setSkills(response.data);
  })

  const [fetchReviews, areReviewsLoading, reviewsError] = useFetching(async (id) => {
    const response = await ReviewsService.getAll();
    setReviews(response.data);
  })

  useEffect(() => {
    fetchUser(params.id);
  }, []);

  useEffect(() => {
    fetchSkills(params.id);
    fetchReviews(params.id);
  }, [user]);

  return (
    !isUserLoading
        ?
          <div className="devop">
            <div className="user-info">
              <div>
                <h2>{createName(user)}</h2>
                <p>{user.info}</p>
              </div>
              <img src={user.avatar} />
            </div>
            { areSkillsLoading
              ? <Loader />
              : <CardsSection title="Услуги" elements={skills} returner={(data) => {
                  return <Card key={data.id} skill={data.element} />;
                }} />
            }

            {
              areReviewsLoading
              ? <Loader/>
              : <CardsSection title="Отзывы" elements={reviews} returner={(data) => {
                  return <Review key={data.id} review={data.element} />;
                }} />
              }
          </div>
      : <Loader />
  );
};

export default Devop;