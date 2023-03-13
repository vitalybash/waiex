import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DevopsService from "../../API/DevopsService";
import ServicesService from "../../API/ServicesService";
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
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [fetchUser, isUserLoading, userErrors] = useFetching(async (id) => {
    const response = await DevopsService.getById(id);
    setUser(response.data);
  })

  const [fetchSkill, isSkillLoading, skillError] = useFetching(async (id) => {
    const response = await ServicesService.getById(id);
    setServices(prevState => [...prevState, response.data]);
  })

  useEffect(() => {
    fetchUser(params.id);
  }, []);

  useEffect(() => {
    user.card_autor?.forEach(card_id => fetchSkill(card_id));
  }, [user]);

  console.log(services);

  return (
    !isUserLoading
        ?
          <div className="devop">
            <div className="user-info">
              <div>
                <h2>{createName(user)}</h2>
                <p>{user.description}</p>
              </div>
              <img src={user.avatar} />
            </div>
            { isSkillLoading
              ? <Loader />
              :
              <section>
                <h3>Услуги:</h3>
                <div>
                  <Carousel
                    elements={services}
                    elementReturner={(data) => {
                      return <Card key={data.id} service={data.element} />;
                    }}
                    elementWidth={500}
                  />
                </div>
              </section>
            }

            {/*<section>*/}
            {/*  <h3>Отзывы:</h3>*/}
            {/*  <div>*/}
            {/*    <Carousel*/}
            {/*      elements={reviews}*/}
            {/*      elementReturner={(data) => {*/}
            {/*        return <Review key={data.id} review={data.element} />;*/}
            {/*      }}*/}
            {/*      elementWidth={500}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</section>*/}
          </div>
      : <Loader />
  );
};

export default Devop;