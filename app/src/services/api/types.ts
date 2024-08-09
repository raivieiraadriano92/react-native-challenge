export type Response = {
  hits: Story[];
};

export type Story = {
  author: string;
  objectID: string;
  story_title: string;
  story_url: string;
  created_at: string;
  isDeleted?: boolean;
};
