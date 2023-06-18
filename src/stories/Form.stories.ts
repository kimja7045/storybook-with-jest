import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Form from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'Example/Form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const email = canvas.getByLabelText(/email/i);
    const question = canvas.getByLabelText(/question/i);
    const submitBtn = canvas.getByRole('button', { name: /post/i });

    expect(email).toBeInTheDocument();
    expect(question).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  },
};

export const EmptySubmit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitBtn = canvas.getByRole('button', { name: /post/i });

    await userEvent.click(submitBtn);
    expect(canvas.getByText(/enter your email/)).toBeInTheDocument();
    expect(canvas.getByText(/enter a question/)).toBeInTheDocument();
  },
};

export const InvalidEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const email = canvas.getByLabelText(/email/i);
    const submitBtn = canvas.getByRole('button', { name: /post/i });

    await userEvent.type(email, 'i-am-not-an-email');
    await userEvent.click(submitBtn);

    expect(canvas.getByText(/provide a valid email/)).toBeInTheDocument();
  },
};

export const ValidInputs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const email = canvas.getByLabelText(/email/i);
    const question = canvas.getByLabelText(/question/i);
    const submitBtn = canvas.getByRole('button', { name: /post/i });

    await userEvent.type(email, 'test@test.com');
    await userEvent.type(question, 'question!');
    await userEvent.click(submitBtn);

    expect(canvas.queryByText(/enter your email/)).not.toBeInTheDocument();
    expect(canvas.queryByText(/provide a valid email/)).not.toBeInTheDocument();
    expect(canvas.queryByText(/enter a question/)).not.toBeInTheDocument();
    expect(
      canvas.getByText(/Thanks for your submission! Now subscribe!/)
    ).toBeInTheDocument();
  },
};
