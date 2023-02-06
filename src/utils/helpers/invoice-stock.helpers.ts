export const statusColor = (status: 'paid' | 'due' | 'draft' | 'pending' | undefined) => {
  return {
    bgColor:
      status === 'paid'
        ? '#E8FFF1'
        : status === 'due'
        ? '#FEEEEE'
        : status === 'draft'
        ? '#E8E9ED'
        : status === 'pending'
        ? '#E8E8E8'
        : '#E8E8E8',
    color:
      status === 'paid'
        ? '#219653'
        : status === 'due'
        ? '#F05757'
        : status === 'draft'
        ? '#1A1F4C'
        : status === 'pending'
        ? '#1A1A1A'
        : '#1A1A1A'
  };
};
