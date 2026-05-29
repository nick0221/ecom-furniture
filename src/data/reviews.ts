import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    author: "Sarah M.",
    avatar: "SM",
    rating: 5,
    date: "2025-11-15",
    comment:
      "Absolutely stunning table. The oak grain is beautiful and the build quality is exceptional. It seats our family of 6 comfortably.",
  },
  {
    id: "2",
    productId: "1",
    author: "James K.",
    avatar: "JK",
    rating: 5,
    date: "2025-10-28",
    comment:
      "This table exceeded my expectations. Easy to assemble and looks even better in person than in the photos.",
  },
  {
    id: "3",
    productId: "2",
    author: "Emily R.",
    avatar: "ER",
    rating: 5,
    date: "2025-12-01",
    comment:
      "The most comfortable sofa I've ever owned. The velvet is incredibly soft and the deep navy color is gorgeous.",
  },
  {
    id: "4",
    productId: "2",
    author: "Michael B.",
    avatar: "MB",
    rating: 4,
    date: "2025-11-18",
    comment:
      "Great quality sofa. Delivery was smooth. Only giving 4 stars because it took a bit to break in the cushions.",
  },
  {
    id: "5",
    productId: "3",
    author: "Lisa T.",
    avatar: "LT",
    rating: 5,
    date: "2025-09-22",
    comment:
      "Perfect coffee table for our loft apartment. The walnut and metal combination is exactly the industrial look we wanted.",
  },
  {
    id: "6",
    productId: "8",
    author: "David W.",
    avatar: "DW",
    rating: 5,
    date: "2025-10-05",
    comment:
      "This accent chair is a showpiece in our living room. Super comfortable for reading sessions too.",
  },
  {
    id: "7",
    productId: "4",
    author: "Anna P.",
    avatar: "AP",
    rating: 5,
    date: "2025-11-03",
    comment:
      "The teak bed frame is a work of art. Natural beauty and solid construction. Worth every penny.",
  },
  {
    id: "8",
    productId: "12",
    author: "Chris H.",
    avatar: "CH",
    rating: 4,
    date: "2025-12-10",
    comment:
      "Beautiful chair with great back support. The velvet fabric is premium quality. Would recommend.",
  },
];

export const getReviewsByProduct = (productId: string) =>
  reviews.filter((r) => r.productId === productId);
