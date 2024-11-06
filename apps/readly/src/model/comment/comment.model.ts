export type SummaryCommentItemModel = {
  comment: string;
  userImage: string;
  userName: string;
  createdAt: string;
  id: number;
  isMy?: boolean;
};

export type SummaryCommentModel = SummaryCommentItemModel & {
  reply?: SummaryCommentItemModel[];
};
