import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProject } from '../hooks';

import { useQueryParam, StringParam, NumberParam } from 'use-query-params';

import {
  NotificationComponent,
  Loader,
  ProjectsTableComponent,
  ErrorPage,
} from '../components';

export const ProjectAllPage = () => {
  const [notification, setNotification] = useState<any>(undefined);
  const { loading, error, projects, total, handleGetAllProjects } =
    useProject();
  const [page, setPage] = useQueryParam('page', NumberParam);
  const [perPage, setPerPage] = useQueryParam('perPage', NumberParam);
  const [filter, setFilter] = useQueryParam('filter', StringParam);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleGetAllProjects(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, filter]);

  useEffect(() => {
    if (error) {
      setNotification({
        status: 'error',
        error: error.message || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      {notification && <NotificationComponent notification={notification} />}
      {loading && <Loader />}
      {error ? (
        <ErrorPage />
      ) : (
        <ProjectsTableComponent
          projects={projects}
          total={total}
          page={page || 0}
          perPage={perPage || 10}
          setPage={setPage}
          setPerPage={setPerPage}
          setFilter={setFilter}
        />
      )}
    </>
  );
};
