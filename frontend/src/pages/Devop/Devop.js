import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DevopsService from "../../API/DevopsService";
import SkillsService from "../../API/SkillsService";
import "./Devop.css";
import { createName } from "../../utils/userNameCreater";
import Carousel from "../../components/UI/Carousel/Carousel";
import Card from "../../components/Card/Card";
import ReviewsService from "../../API/ReviewsService";
import Review from "../../components/Review/Review";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../components/UI/Loader/Loader";

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
              :
              <section>
                <h3>Услуги:</h3>
                <div>
                  <Carousel
                    elements={skills}
                    elementReturner={(data) => {
                      return <Card key={data.id} skill={data.element} />;
                    }}
                    elementWidth={500}
                  />
                </div>
              </section>
            }

            {
              areReviewsLoading
              ? <Loader/>
              :
              <section>
                <h3>Отзывы:</h3>
                <div>
                  <Carousel
                    elements={reviews}
                    elementReturner={(data) => {
                      return <Review key={data.id} review={data.element} />;
                    }}
                    elementWidth={500}
                  />
                </div>
              </section>
            }
          </div>
      : <Loader />
  );
};

export default Devop;