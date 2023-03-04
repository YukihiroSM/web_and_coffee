import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProject } from '../hooks';
import { Notification } from '../types';
import { ProjectsTableComponent } from './projects-table.component';

import { useQueryParam, StringParam, NumberParam } from 'use-query-params';
import { Loader } from './loader.component';
import { NotificationComponent } from './notification.component';

export const ProjectAllPage = () => {
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined
  );
  const { loading, error, projects, handleGetAllProjects } = useProject();
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
        error: error || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      {notification && <NotificationComponent notification={notification} />}
      {loading && <Loader />}
      <ProjectsTableComponent
        projects={projects}
        page={page || 0}
        perPage={perPage || 10}
        setPage={setPage}
        setPerPage={setPerPage}
        setFilter={setFilter}
      />
    </>
  );
};
