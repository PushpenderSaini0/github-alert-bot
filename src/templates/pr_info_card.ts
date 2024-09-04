import { getFullName } from '@/utils';

const prInfoCard = (headerMsg: string, subtitleMsg: string, newPrSummary: PullRequestSummary) => {
  const card = {
    header: {
      title: headerMsg,
      subtitle: subtitleMsg,
      imageUrl: newPrSummary.author.avatarUrl,
      imageType: 'CIRCLE',
    },
    sections: [
      {
        header: 'PR Status',
        collapsible: false,
        widgets: [
          getDecoratedText('External Repository', getMaterialIcon('book'), newPrSummary.repoName),
          getDecoratedText(
            'Approval Status',
            getMaterialIcon('check_circle'),
            newPrSummary.isApproved ? '✅ Approved' : '🟡 Approval Pending',
          ),
          getDecoratedText('Merged Status', getMaterialIcon('merge'), newPrSummary.mergedAt ? '🥳 Merged' : '🔄 Not Merged'),
          getDecoratedText('Author', getMaterialIcon('person'), getFullName(newPrSummary.author.login)),
        ],
      },
      {
        header: 'PR Details',
        collapsible: true,
        uncollapsibleWidgetsCount: 2,
        widgets: [
          {
            textParagraph: {
              text: newPrSummary.title,
            },
          },
          {
            divider: {},
          },
          getDecoratedText('PR Brach', getMaterialIcon('code'), newPrSummary.headRefName),
          getDecoratedText('Base Branch', getMaterialIcon('code'), newPrSummary.baseRefName),
          getDecoratedText('Created At', getMaterialIcon('schedule'), `${newPrSummary.createdAt.split('T')[0]}`),
        ],
      },
      {
        collapsible: false,
        widgets: [
          {
            buttonList: {
              buttons: [
                {
                  text: 'View On GitHub',
                  onClick: {
                    openLink: {
                      url: newPrSummary.webUrl,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  };
  return card;
};

const getDecoratedText = (topLabel: string, materialIcon: any, text: string) => {
  return {
    decoratedText: {
      topLabel,
      startIcon: {
        materialIcon: materialIcon,
      },
      text,
      wrapText: true,
    },
  };
};

const getMaterialIcon = (iconName: string) => {
  return {
    name: iconName,
    fill: true,
    weight: 300,
    grade: 0,
  };
};

export { prInfoCard };
