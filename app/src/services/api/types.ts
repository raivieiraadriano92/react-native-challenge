export type Response = {
  hits: Story[];
};

export type Story = {
  author: string;
  objectID: string;
  story_title: string;
  story_url: string;
  created_at: string;
  created_at_i: number;
  isDeleted?: boolean;
};
