import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();

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

    // fetchBook(bookId).then((book) => {
    //   setBook(book);
    // });
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded };
};
