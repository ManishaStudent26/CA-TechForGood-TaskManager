import { apiFetch } from './client';

export const api = {
  users: {
    getByEmail: (email) => apiFetch(`/user?email=${encodeURIComponent(email)}`),
    getById: (uid) => apiFetch(`/user/search?uid=${uid}`),
    getAll: () => apiFetch('/allusers'),
    create: (userData) => apiFetch('/user', { method: 'POST', body: userData }),
    update: (uid, userData) => apiFetch(`/user/${uid}`, { method: 'PUT', body: userData }),
    delete: (uid) => apiFetch(`/user/${uid}`, { method: 'DELETE' }),
  },

  projects: {
    getAllByManager: () => apiFetch('/api/projects'),
    create: (projectData) => apiFetch('/api/projects', { method: 'POST', body: projectData }),
    update: (pid, projectData) => apiFetch(`/api/projects/${pid}`, { method: 'PUT', body: projectData }),
    delete: (pid) => apiFetch(`/api/projects/${pid}`, { method: 'DELETE' }),
  },

  tasks: {
    getByProject: (pid) => apiFetch(`/api/projecttasks/${pid}`),
    getByUser: () => apiFetch('/api/task'),
    create: (taskData) => apiFetch('/api/tasks', { method: 'POST', body: taskData }),
    update: (taskid, taskData) => apiFetch(`/api/tasks/${taskid}`, { method: 'PUT', body: taskData }),
    delete: (taskid) => apiFetch(`/api/tasks/${taskid}`, { method: 'DELETE' }),
    assignOwner: (payload) => apiFetch('/api/setOwner', { method: 'PUT', body: payload }),
  },

  contributors: {
    getByProject: (pid) => apiFetch(`/api/projects/${pid}/contributors`),
    add: (pid, uid) => apiFetch(`/api/projects/${pid}/contributors`, { method: 'POST', body: { uid } }),
    remove: (cid) => apiFetch(`/api/contributors/${cid}`, { method: 'DELETE' }),
  }
};