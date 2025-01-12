### Using MijnUI Components with Next.js

This repository showcases how to use MijnUI components with Next.js. It’s based on [Kiranism/next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter), but with customizations to highlight MijnUI.

A few things to note:

- **MijnUI** is currently in beta and not ready for production. We’re actively working on improvements, and your feedback is more than welcome!
- Some components, like charts, are from [Shadcn/UI](https://github.com/shadcn/ui) since we haven’t created them yet.

## Pages

| Pages                                                                            | Specifications                                                                                                                    |
| :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [Signup](https://mijnui-dashboard-starter.vercel.app/)                           | Authentication with **NextAuth** supports Social logins and email logins (Enter dummy email for demo).                            |
| [Dashboard](https://mijnui-dashboard-starter.vercel.app/dashboard)               | Cards with recharts graphs for analytics.                                                                                         |
| [Product](https://mijnui-dashboard-starter.vercel.app/dashboard/product)         | Tanstack tables with server side searching, filter, pagination by Nuqs which is a Type-safe search params state manager in nextjs |
| [Product/new](https://mijnui-dashboard-starter.vercel.app/dashboard/product/new) | A Product Form with shadcn form (react-hook-form + zod).                                                                          |
| [Kanban Board](https://mijnui-dashboard-starter.vercel.app/dashboard/kanban)     | A Drag n Drop task management board with dnd-kit and zustand to persist state locally.                                            |
| [Not Found](https://mijnui-dashboard-starter.vercel.app/dashboard/notfound)      | Not Found Page Added in the root level                                                                                            |

If you find this interesting or helpful, **support us by giving this repo a star**. It means a lot and keeps us motivated! 🌟
