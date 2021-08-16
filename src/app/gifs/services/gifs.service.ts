import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _giphyApi: string = 'pp7RixGhNgvr9OACMsH9o23LnEKNaBQZ';
  private _historial: string[] = [];
  private giphyUrl: string = 'https://api.giphy.com/v1/gifs';
  public results: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {
    if (query.trim().length === 0) return;

    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._giphyApi)
      .set('limit', '15')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.giphyUrl}/search`, { params })
      .subscribe((resp) => {
        this.results = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.results));
      });
  }
}
