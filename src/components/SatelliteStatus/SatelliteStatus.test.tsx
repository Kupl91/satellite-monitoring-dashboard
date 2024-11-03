import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SatelliteStatus from './SatelliteStatus';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:3000/satellites/status', (req, res, ctx) => {
    return res(
      ctx.json({
        active: 10,
        inactive: 5,
        maintenance: 2,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders satellite status', async () => {
  render(
    <Provider store={store}>
      <SatelliteStatus />
    </Provider>
  );

  expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText(/Активные: 10/i)).toBeInTheDocument());
  expect(screen.getByText(/Неактивные: 5/i)).toBeInTheDocument();
  expect(screen.getByText(/На обслуживании: 2/i)).toBeInTheDocument();
});

test('handles server error', async () => {
  server.use(
    rest.get('http://localhost:3000/satellites/status', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(
    <Provider store={store}>
      <SatelliteStatus />
    </Provider>
  );

  expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText(/Ошибка при загрузке статуса спутников./i)).toBeInTheDocument());
  expect(screen.getByText(/Повторить попытку/i)).toBeInTheDocument();
});