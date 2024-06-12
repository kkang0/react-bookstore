import { useEffect, useState } from "react";
import {
  BookDetail,
  BookReviewItem,
  BookReviewItemWrite,
} from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);

  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const { showToast } = useToast();

  const likeToggle = () => {
    // 권한 확인
    if (!isLoggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if (!book) return;

    if (book.liked) {
      // like 상태
      unlikeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1,
        });
        showToast("좋아요가 취소되었습니다.");
      });
    } else {
      // unlike 상태
      likeBook(book.id).then(() => {
        // 성공
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
        showToast("좋아요가 등록되었습니다.");
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;

    addCart({
      bookId: book.id,
      quantity: quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    const loadBook = async () => {
      try {
        const bookData = await fetchBook(bookId);

        const normalizedBookData = Array.isArray(bookData)
          ? bookData[0]
          : bookData;
        setBook(normalizedBookData);
      } catch (err) {
        console.error("Failed to fetch book: ", err);
      }
    };

    loadBook();

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
    });

    // fetchBook(bookId).then((book) => {
    //   setBook(book);
    // });
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((reviews) => {
      //   setReviews(reviews);
      // });
      showAlert(res.message);
    });
  };

  return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
