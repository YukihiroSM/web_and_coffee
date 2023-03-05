import React, { useEffect, useState } from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';
import { useProject } from '../hooks';
import { Notification } from '../types';
import { ProjectsTableComponent } from './projects-table.component';

import { useQueryParam, StringParam, NumberParam } from 'use-query-params';
import { Loader } from './loader.component';
import { NotificationComponent } from './notification.component';

export const ProjectView = () => {
    const [notification, setNotification] = useState<Notification | undefined>(
        undefined
    );
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const pathname = window.location.pathname.split("/");
    const projectId = pathname[pathname.length - 1];
    const [project, setProject] = useState(null);

    useEffect(() => {
        console.log(projectId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

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
            <div>Hello Mr. Baiden</div>
        </>
    );
};
