import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  detailsOfRepo,
  languageJSON,
  listOfTopics,
  listOfContributorsNames,
} from '../apiCalls';
import CardsComponent from '../components/CardsComponent';
import { mapLanguages } from '../utils/helpers';
import '../styles/RepositoryDetailsPage.css';

const RepositoryDetailsPage = () => {
  const { state } = useLocation();

  const [detailsRepo, setDetailsRepo] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await detailsOfRepo(state.owner, state.repo);
        const languagesJSON = await languageJSON(state.owner, state.repo);
        const languages = mapLanguages(languagesJSON);
        const topics = await listOfTopics(state.owner, state.repo);
        const contributors = (
          await listOfContributorsNames(state.owner, state.repo)
        ).slice(0, 10);
        setDetailsRepo({
          id: data.id,
          name: data.name,
          forks: data.forks,
          stars: data.stargazers_count,
          watchers: data.watchers,
          ownerName: state.ownerName,
          ownerAvatar: data.owner.avatar_url,
          openIssues: data.open_issues,
          contributors,
          languages,
          topics,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className='header'>
        <div className='box'>
          <h2>
            About <i>{detailsRepo.name}</i> repository{' '}
          </h2>
        </div>
      </div>
      <CardsComponent props={detailsRepo} />
    </>
  );
};

export default RepositoryDetailsPage;
