import { createFileRoute } from "@tanstack/react-router";

import UsersListPage from "@/pages/users-management/list";

export const Route = createFileRoute("/_authenticated/users-management/")({
  component: UsersListPage,
});

// function UsersManagementPage() {
//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
//           <p className="text-default-500 mt-1">Kelola pengguna sistem</p>
//         </div>
//         <Link to="/users-management/create">
//           <Button color="primary" startContent={<Plus size={18} />}>
//             Tambah Pengguna
//           </Button>
//         </Link>
//       </div>

//       {/* Search & Filter */}
//       <GlassCard className="mb-6">
//         <div className="flex gap-4">
//           <div className="flex-1 flex items-center gap-2 bg-default-100 rounded-lg px-4 py-2">
//             <Search className="text-default-400" size={18} />
//             <input
//               className="bg-transparent outline-none flex-1 text-sm"
//               placeholder="Cari pengguna..."
//               type="text"
//             />
//           </div>
//           <Button variant="flat">Filter Role</Button>
//         </div>
//       </GlassCard>

//       {/* Users List */}
//       <GlassCard>
//         <div className="space-y-4">
//           {/* Sample user rows */}
//           {[
//             {
//               name: "Admin User",
//               role: "Pemilik",
//               email: "admin@example.com",
//               status: "Aktif",
//             },
//             {
//               name: "John Operator",
//               role: "Operator",
//               email: "john@example.com",
//               status: "Aktif",
//             },
//             {
//               name: "Jane Staff",
//               role: "Petugas",
//               email: "jane@example.com",
//               status: "Aktif",
//             },
//           ].map((user, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-4 bg-default-50 rounded-lg hover:bg-default-100 transition-colors"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
//                   <span className="text-primary font-semibold">
//                     {user.name.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="font-medium">{user.name}</p>
//                   <p className="text-sm text-default-500">{user.email}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div>
//                   <p className="text-sm font-medium">{user.role}</p>
//                   <p className="text-xs text-success">{user.status}</p>
//                 </div>
//                 <Button size="sm" variant="flat">
//                   Edit
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </GlassCard>
//     </div>
//   );
// }
