import 'modern-normalize';
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { fetchNewImages } from './Handler';
import { QueryForm } from './Form/Form';
import { ImageGallery } from './ImageGalery/ImageGallery';
import { Circles } from 'react-loader-spinner';
import { LoaderWrap, Load, Searchbar, Wrapper, LoadWrap } from './AppStyled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [dateQuery, setDateQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  /**
   *Methods
   */

  const handleSubmit = newQuery => {
    if (newQuery === '') {
      return;
    }

    setDateQuery(`${Date.now()}/${newQuery}`);
    setCurrentPage(1);
    setImages([]);
    setTotalPages(0);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevCurrentPage =>
      prevCurrentPage < totalPages ? prevCurrentPage + 1 : prevCurrentPage
    );
  };

 

  /**
   * Update
   */

  useEffect(() => {
    if (dateQuery === '') {
      return;
    }
    setIsLoading(true);

    const fetchImages = async () => {
      try {
        const fetchedImages = await fetchNewImages(dateQuery, currentPage);
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);

        setTotalPages(prevTotalPages =>
          Math.ceil(Number(fetchedImages.totalHits) / Number(12))
        );
      } catch (error) {
        alert('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [dateQuery, currentPage]);

  return (
    <Wrapper>
      <header>
        <Searchbar>
          <QueryForm onSubmit={handleSubmit}></QueryForm>
        </Searchbar>
      </header>

      <div>
        {isLoading && (
          <LoaderWrap>
            <Circles
              height="80"
              width="80"
              color="#3f51b5"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </LoaderWrap>
        )}
        {images.length > 0 && <ImageGallery images={images} />}
      </div>

      <LoadWrap>
        {images.length > 0 && currentPage < totalPages && (
          <Load onClick={handleLoadMore}>Load more</Load>
        )}
      </LoadWrap>

      <GlobalStyle />
    </Wrapper>
  );
};
