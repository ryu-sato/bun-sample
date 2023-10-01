import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    [
      createUsers(),
      createKanbans(),
    ].flat()
  );
}

await seed();

function createUsers() {
  const users = [
    {
      name: "alice",
      taskColor: "#000000",
    },
    {
      name: "bob",
      taskColor: "#880000",
    },
    {
      name: "charlie",
      taskColor: "#008800",
    },
  ];

  return users.map((user) => {
    return db.user.create({ data: user });
  });
}

function createKanbans() {
  const kanbans = [
    {
      name: 'Project A',
      sprints: {
        create: [
          {
            name: 'sprint-1',
            beginAt: new Date('2023-07-03T00:00:00+09:00'),
            endAt: new Date('2023-07-14T00:00:00+09:00'),
            swimlanes: {
              create: [
                {
                  category: 'support',
                  title: 'topic ブランチに git push された際に、リントチェックとテストをする',
                  body: "## やること\n\n- Github Action で CI 用の workflow を追加する",
                  tasks: {
                    create: [
                      {
                        title: 'Github Action (ガワ) を作る',
                        status: 'INPROGRESS',
                      },
                      {
                        title: 'Github Action を完成させる',
                        status: 'OPEN',
                      },
                      {
                        title: 'eslint をインストールする',
                        status: 'OPEN',
                      },
                    ],
                  },
                },
                {
                  category: 'support',
                  title: 'main ブランチにマージされたら demo 環境にデプロイできる',
                  body: "## やること\n\n- Github Action で CD 用の workflow を追加する",
                },
              ]
            },
          },
          {
            name: 'sprint-2',
            beginAt: new Date('2023-07-17T00:00:00+09:00'),
            endAt: new Date('2023-07-28T00:00:00+09:00'),
            swimlanes: {
              create: [
                {
                  category: 'feature',
                  title: 'ユーザーがログインできる',
                  body: "## やること\n\n- ログイン画面を実装する\n- ログインアカウントからユーザーを認証する\n- 認証されたユーザーは認証画面をスキップ出来る",
                },
                {
                  category: 'feature',
                  title: 'topic ブランチに git push された際に、リントチェックとテストをする',
                  body: "## やること\n\n- Github Action で CI 用の workflow を追加する",
                },
              ]
            },
          },
        ],
      },
    },
    {
      name: 'Project B',
      sprints: {
        create: [
          {
            name: 'sprint-3',
            beginAt: new Date('2023-07-31T00:00:00+09:00'),
            endAt: new Date('2023-08-11T00:00:00+09:00'),
            swimlanes: {
              create: [
                {
                  category: 'support',
                  title: 'topic ブランチに git push された際に、リントチェックとテストをする',
                  body: "## やること\n\n- Github Action で CI 用の workflow を追加する",
                },
                {
                  category: 'support',
                  title: 'main ブランチにマージされたら demo 環境にデプロイできる',
                  body: "## やること\n\n- Github Action で CD 用の workflow を追加する",
                },
              ]
            },
          },
        ],
      },
    },
  ];

  return kanbans.map((kanban) => {
    return db.kanban.create({
      data: kanban,
      include: {
        sprints: {
          include: {
            swimlanes: {
              include: {
                tasks: true,
              },
            },
          },
        },
      },
    });
  });
}
