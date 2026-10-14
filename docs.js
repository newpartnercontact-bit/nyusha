/*
 * 書類テンプレート（雇用契約書・秘密保持確約書）
 *   入力フォーム（GitHub Pages）と kintone の印刷の両方で使う共通ファイル。
 *   労働条件を変えるときは、下の CONTRACT の文言だけ書き換えてください。
 */
(function (root) {
  'use strict';

  const COMPANY = {
    name: '合同会社newpartner',
    address: '北海道札幌市中央区南４条西１丁目１５−２ 栗林ビル6階',
    repTitle: '代表役員',
    repName: '佐々木　聡',
    ndaTo: '代表社員　佐々木 聡',
  };

  // ▼ 労働条件（雇用契約書.xlsx の内容）
  const CONTRACT = {
    renewal: '更新する場合がある', // 自動的に更新する / 更新する場合がある / 更新しない
    renewalCriteria: ['契約期間満了時の業務量', '勤務成績、態度', '能力', '会社の経営状況', '従事している業務の進捗状況'],
    place: '北海道札幌市中央区南４条西１丁目１５−２ 栗林ビル6階',
    job: 'コールセンター業務',
    hours: '11時00分～20時30分',
    rest: '90分',
    holiday: 'シフトによる',
    wageType: '時給',
    wage: 1131, // 時給（円）の初期値。実際はGASが厚生労働省の北海道最低賃金を自動取得して差し込みます
    allowance: '歩合手当：成績により支給。',
    raise: '無',
    bonus: '無',
    payday: '毎月末日締め　翌月末日支払',
    retire: ['自己都合退職の場合、退職する30日以上前に届け出ること', '解雇の事由及び手続については、就業規則による'],
    retireAge: '就業規則の定めによる',
    other: ['記載のないものについては労働基準法に準ずる', 'もし届出がない場合は支払日に札幌市最低賃金による計算での支給となり支給日にて現金手渡となる'],
  };

  const SEAL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAACyCAMAAADcShUdAAAAYFBMVEW5IifQIifYICvIICf9AVmqAVT/Xl6qVVXIICiqVQD/YQBsDiN2AHZ/fwD//wB/f3//AP8AAAD/AADJHSjHHSfHHSfHHSfHHCfHHSfHHSfJGSnNJCh/AACtAAHJISe9ADxXN412AAAAIHRSTlMLCP5WAwMCA5MDAgMCAgECAQAB929PjS+vzxMRAgMuBM9YWL0AACQaSURBVHjaxV2JeuQ2jyStbs9Mkj1E6yR1vP9bLqoAUlQfdjvJzq8vGdt9ligQZwFybTkCjnVdw8U7z2Pfgx2r827HcyG/9HiLHEv1b8hPlo9tz8fxCvyw3+1z5CPa+lOON+eX4V9XHmyfHO/vd995+vnpsYRPP/vRO/Yrf5R/cCZtWAVqdKs+lkHL724c+75puq7vRz02PtDgf/l9jDG6xFenyJ8hRT30Z5LLkdIq32J48TN4fwNr9cE7rOhVQKzyJjmni1xW5/EZ3jl+oH6RT4u96xoFUNxdewKd+m6aP+yY749pGOR8xhTlQ/F++8mj1wOnqefm7GS8i2NKgmaNxyGI+ClxlF9HeV4e0o/BgsnR9U2Pj/Fx3JzDGoUw8vF+BFQFLcue+gGQ3+T4eHIQef/o6Hg0/Ld6mCfR45/m7i3j1guOUV8mr2q6YRimfAxcIVznbdNV6fDs8LMbfRtspd3WH8tM7PmX6nfAxsfhE4fjZ5f/KA9l/PcHnnvyzDyf12dW6A0XWADjaSza6BW092M33S8rjmqRp2n47KgAyLLVV+CE7Rno05rp+vAb9eIN9vQ8dWMS8ZBtkMZ+sgWmdEwdT6/6XlypfKFuLnMlC/xnGynrG37Vx/taDPQoH6UvlLd2wwnzBLnOsrbhaYU9QT4cFFIcBz2L/P2yN5ITXQB1IQpBjujdewh/iALHU9xb2EuJ2yVrjySqIL1TZcgLnMDHD2ebz7Yh/vT4w3nZhCu+Qr7LyS4sFxvridcQBj9XtuTIizH1MUE8RKn0OItpbP+dw/S4wPPy4Rf/ySv38uue1j5LyNS7By+O/YCnLu3ClW57vHSIYadVWoKZnlAdn8F7YPYevOzLM3WdoR7GbF3LuwWX30S/TWOg9pB/AXruXOvwOu/+4ULDoH/r9Rf6DKsfRXCx5XsXYKJ45OWQnzipYWsNdNspaHmp2CtI5q9nS4clWO5XfslA+QxM3ApPZaG7sj49C9jF6k/XU1N3N9KRYUdRF0NsfwTVHgo6tpcQnO7EG+H4XErOzhE8gvANMfGyyUWFiFHsbaWHXnZgCPsCP205Xii2ZFharypvmwx0wMlCq8tFWNbL5Xr3X7hz1cyt+h/KnTz0ntw66p5Wt+M9X6FbucEHONg1XeBKUw8d9aOojE0ue359EtACEmZcnCpq6ZkXhcpPfo/xyVqmUZRYutEIUYx19Ff+RhcCXkJW0zzKei31snt9uerg+bAUc7EqeL/BDpD5zgtg1/4VPHfttFGPTLZ/i9Fo4AEcXoZaP3FoxHWKwTyX2MnV6XooU3gQ5l/ZoYbNTiBVQgI3CY9tfWcWVV+u//MRNRsGunUCWpQjpM/p6hL0blpHNsP0yGfKfgiXok/qP+7tOOmbhtoYqyHOnoB5E33eekH2FXCOdEJl8xchgKHpbZXVtYs8U66NvP/SipzHhl854M1xKKBm9Zb0gt0cfEHXb+pV+3Z86BRyuXAah8s1D+OlVf0SeVVkzy13MriqzyumkLLWbAX00OOn+OFJLdEAtT3m9Z2GZ27aIWwxrbrf1DjxJOkImr9irrb5doP6DrJsF2JI3H5y5rIbBbhEDmL8xWCHyw6XHzGFBBAJQQmdaHlbBTp2j0D36fKqdXAC+u042ebWHUC4k9JG1LNcUAUdM2gTjP2hnkwi8N0YDHR/Bxp7ZJzesiVNL5u09QA9d7LZH6top0s9+HZXcyTiIaBlH4rIysKKe5V1kk+MgDwMnciH7cSLKOqu50eFAnoLB2iRvR+PrYt5J9S7BXRzgMaOgg2EIdbXmkrWiygvUNABEMwL11+okcRNpBxnH507URSmfNe1Bp2aGnT+8sjYM7QvxNwV6Enkb1nvUwaysJuCbjLo4Mbetsn0U3YCYodRnXDoPI1BfnZwxVVPXkU8jpVW0BPOJ4OGm7p+XzwEcwpPrDUV6xtAryYvDGSJHIvKfZsgGL09RIMgCnBUlXepQa+mZUVy/Ggqr4vfyFbsWXuIagjrs9fQ8Xyb+11BM/wfqDcZUSDcYB4hIYRPOZyPoQJdiUcw49IT9Kxm/DveZQYN5/b5a/4b5kpAe4CG1zFiOfsxfnUdk7kUe+tF8Kk9CmhskZA6E5X2m6DfeNrXZXnymgvcHYDGt6iebkR7DB2+6YLl3a9wY7nD993yct6JsxzMWu6Hng7ZSfqQj1sVNJRpCN9WeZPu8ie63BXN6gmaGm8amuS/+CZRfMXFKaDLSotrmvripX5/paHpl6cn5vuZLxpbzcghUEUsLbvPnxT66h4mBOU9FehLdndia/kP0dLfSRp6A43d+wz0n/I1g1otEw/ZPvM8QL/Bj42ad2iQbUASInlky8a41qcTh0lBL+1uoMWf9tvfAB0M9PyZyhHnggsiH+0LaPkLCURd8F79WDUpsIhMm7naAYdrGqCIFlF55nt4CcOagRctfmelxTWdzRd6+jaoi4ZCTFOxKOgJWLlKfX9k1zQ3xEQRMD0ADZkuFlFiH/pk2+uOB+VVrpUmrD5LEbhR9IX5JtyIIh0SB2CVhl5zUtWhnnQTa9DjAbrNoBlNMEZKf3wT9MDM4Fd5DeTNlvyX7HlI6EgLs9wFu3EkkmegzXZzpVvNPYfvJe8FQNOnr94kLhKC7lBAc1sJaqYMquRQjkbTrUxXoL1GVnBGF2jFdV3bbx5/yE5fXtEz3rkMWiwiFFjEdot1waYoW/H3Nv9kpVU3U3uEb+SxHiz4d9J9YRXQYwF995UC7jnopXUZdNSsXAjfx/zim6pXBcgF4qgRqdx70GvwG7NGj1c6R+PVSv+OQ2wCxQPqzfROlg6snbh5CA/j4SGfVJ7T6G1qfi/odeNKW2o93eijNjFa7xhRlo18gP5l9rVP/kmOMPx/nEyAeIgfhUrW6MUR9y7Bq44eDjVEHSFkDXo/xCOolyf2NabfuNACuocRQ0YNVTvUBU62BWHYUIsH4/ez9hBH16/hPrPbtn99Q5+E2x0VwrNqM6RZNiDqBe4aQhqthEgZ12JPc5Lp1jcH6Egn6aHnsGhGEc7jKyISmAcKl32nG7+HdXl6vlAAtQ2NOU1Iz2PLRr02LqHWHv1kjt1yr01jr0Hni9WBpw59SDHcgk5MdJjG8AU0Eq4pPU6dFD2NXDWyLPfmYW1TpynQblu+EhFuV7HSVZLYiw6IGqek8c6d8j6dHNxRfTtB7B8mm07GxfeD1jksnbmvyMZgDx+lm1mCZkZruxjc647oze9rZSqYbU+aEDhqnvyL7kYat+jW06Zh4L5ozeWKrKPV9px4a+tOosYp5AztdoBmJhDSEXD2dQbPZ8xvohC3sH5qwUWx9kNnOX1N8LLmKh5rWJC97dPdfoRY3AtCeFhysaR6BRpRsTwrW3h0EVXXbYR2n+sKqmyP5FCHR1E2ORQtQ+VLask9F6PLbx0ymTvTun28F/l12yLYEiMLDPAx4ZGOso3J8zgHx31tEWF6IsP8Ln9hXRg/kSlyfpyhncvrBcjGH2D6JRZahajg9oJigxaA/jrHae1meWCeYU6G4cORIpOdyvxLuAcNP7zDtQPokrvP2fO6ClCn1WekaaM6wkEja2OEVNmX5Ro1HmstNSHP/jquetSCFr9S3n9QNzTJDfMu56XJVMZr01xAOzXySCwcCUs96yqtP52WHqvRx91raV2LNl2zsQwRnByywtyc+77AV2ZUBSTqtXMf+JFLPNsV6k6MD12BPlJiVf3iawbkLx3LcCzCKQ3Kr0ijiXVIaduaZigyDWbCMB2yKuu84qNy3gGRsfpotS+ff8cuJY4m5gTk+5g/j0WmdfX7rhk8NeKmsuU3zYYi0fg2Q2EQtFzcaXxk81zKRfaJ/J+xKXUyMVaLZSOspjT3n0Q8Po1mPApolgK4+kN3Nl50pZFSlS0PfSwerKjadZsIuiXoeIAOZLVdkLtMO8Ku0UB3SYtoyRhWPjp1M0q4ZhpGg391IlQsNxK4OlbqmEIIOQgw0L3sOtFcVCEiX3jaaaVIVBRAdwSNmP8A/Wylkc7XlX77ENuzVKah+i34unpXb4NZy3K6QcqjqlzzSltVSeTWeFebWy87i6K6+mLfbKVfA81VzKCfGvG4FdBvh57JFVjdZVkj4e8+5s8eTd3J0ZSyqooelXX8oy2Zhl3T8m9zbK9fgXYFNEsImonNRASVaZ/6IVe2hkK4arqKMwaHPlduS2jFcDxnljrb5Nx8m5KQBDWIEwp6NdBTzNrjBdBdTk08iKtzJr6qbN0aZ/H4tVK++VzppkHqMuijNNRoBEDUiyjGUUEHrcy+BFoTObLSNzb16uzLl/ZitC0Qj5anjqmlusZxN6pMqbnkIpcub7/RmOIvuboB2avBQCN5PoA4AScboEXYH7n5lrv+mJsLLQZMUYqsA4uXrnGzODLTRybNbaMEeEgpe6gYEDnV/1NuAspuOXxegiMwBLCkmMDFwz+Xa3IJCgfmcAFo27rY8QJa+R4RjsET0JvVMxqr3TsjrHFV6DFpLtFQmxp3N0UTKw2qmjCLCD4M/NbWCvvnr2XQ5UwzZn0jinoIBnp/DnrVhDW9BvHO8d20hz8pfqi1QqjFcEz1oToA+nxLuTqe5dUdmgnFWHBQ6PGIZQL12Ywa3SHxYmSza6aBoMdpVtAB2W7xVx6DdqNSUD+yCvuoiBydaa92KWST4qDcsmupGEbn6tTL1tMVUCsjkXkSEaEtkNNpUPjSimcGDfGGnXF0mLanoMO6Gte38u4yvbS7Mb5R65iVeSl+onmy8WaTiymMdISGybgLTW/sXqYPyJt2GbQT9TEzEQLQ8SnoRaEMJR4xlzETJV0xnRePSHUTu9Z1N4xZk2WRjMsplwfQAEY/uaY7d4OWI5CnQ5hqoH9At3YeoFk0eioePH6l1atXr8RP174LwPSt3M4d2S+Dxu7u7fJkrgiYLfMM32q5HKAl/hnMn1bt8SnoyvsCAfUb7PpPk70RF2VcudJzpmeTEkw6zoz0knyJRFNbtdJIo34JOiD34vbLpXKXVvOd7jwsCePXUm31iASS/rWH25DPLOLmDfSkypIcXw1nupFslsTkapFp3/7xjZU+2iv+lZVeFPSYQQ+x9sEYB5NeWyqeKOhTe/jvice/mn+EazqwIkbnpTPWYU41CuiLQD2Bhp6OrNj+x0Az9Gc6T8DMnbbSiJINa1TQIFnsIhNDY6AjQYsp/c+B9lDGjN1RcR7W2qSRnBhDIGhzTS8SbzHlGFwu+P5u0OQUqHgQwDAm75kkC2IqB6amPFjhBTQzpeRHCOj3rQYdMs8irJc1O/01B+thWPadFT5AAxhWmpeaygOkeiZDJn1OgpQ0sLBCIzTDnyZoX630C98Of/Fa5x6XBynzEtg8oStn0H3cF4ZU2dIzna5BTD+K//TOrGOycilB0/f4cVpp8BXQO8DMmr/soPBqzA/CSwKp947w9x3TuBr7bsV1H3onIX9Aqcp8mkyzHMjGA7EUoJVPj5UessOUvbwlFLL4YBkAS8iJ/+8T05L0iFPNH28v/V3OHe7q8sRtLDHixoJ6RNAKRVIxh7UNijQdlWmCFv1c+dPM6AroKyKMgyFrhOC+tJv0lilkOsNXtQKsWC1ZgVk6eAx/nn3GgApczN4xk7W6iOL0I25xxoxFkStzn6CnkcoSsLEC7Qz0X2AHVz1nH2cetKb45swpBuyQGVBTHyv/TVMaMGn1amvaXUKHCnTO3PgMchc/zFdb9nKYcYkWmIA8g4bzPd33mE1Vl9OQvfyZFHzoEotqt1L9WI/C9Q0zwdEInkC7akOHpe7NLEqmt3dgpQHanUGnrZnuIKMxrjs6l4YSm9A3yHSAj24tzZk/soyJz1OWmrtfKbH8YyHT48vSNlwUY1aEME5n1xSgF19E+iPT8hmmxtwW5T2zn4p6kHX8X1TWM5UvXLIumw+Od2sOoRhnnvDUZZmOmngMt/XGm7PYkXWwcLcCnVd61cirJBM3/6idIWd23+ZmRRdEatQblvXQes3eV/m8rgjoomdH6Sfo1Hd9+to0iLyvdjpbFQQwjUQ9HXKLn+hztaoPiVbKaAM7bKcEEw0y3Ebzqbvd7NpCrWkWO2YqskQu23eoJfIRNWhIMvV0sFzzXNIQbDAON03FI2mBH4NrveoKbTmJS9jPOVRbWTmuWYyGwkryfvtWw5UHb7xsRHE+inE5OHorWc+PLtca7XJs7Z8IY7QjCTRB2oJMSx4mY6Bqo6Ytx0GlCv7OuLJhKzyorFsptQLdHqDDAfrphUuwTLr3QmFA2pv+yqxk2YK5ojehnhQtDvwWx/l2pU+gR5YICDqLh/8MdBpObYNGJhSczsUmy/vurXdBNsimOZ95kiDQPecprJlbelRtwj3o/QQ61KDDK6BVNVyCKjnZCbl9c1DaqbXNzGJJjc7q4o+TK3j+ElrxSmM5keNioAB6OkBvP1V7hNbKFXO3fwp6umnQ/G8/mBhnwyMSK3q/lGy0CvCwpePCgpNzSMUqd51driv7XRsyZwrorgINQe4I2uwCvvQT0HkjHjTaeOrgzlaPSqoysOJirnfbemQfHEpnXensy63vegqhPUjfHdug8DH99PYGn/WSe7c+Db5cBfpH8UTrOnofvU0WWE719f7cHQG2P4pv0HzxaFi2jHGXi1+j8SPo8Cm9HhFvP7+9QQpF6/bFJr8AOra+7KVDPZ81xNGRPg/aGVRlZPuNJQyx02nr6tK49cxNhWIcxJdoXW5kADVcVsNA23eLdXveE1DEY0h5lILS3UszUruudYGMT7xR9YVzsoZVYIIms0YTl80xnKAjx5q5ES8RT9V9wVrGm5g32Fd+NzRe+ERfUimweHS0UIdm1tTuNK71m//MukZ0y+r2OlAgXpYpArw1FDuR3xQHLW5MkCUQeyAgv9BV+qeAbhpjqr/TtevZycyW0KkZ1/ApExrUcNltay1DSasq/baerpIAMhpUckvlzTBZ02GIhXPru0/XFnpCFByLTYn8D1DIlCjC2hSDGOtHVOKV8a5YUxg/9XIlFB6NKBPaBzXc2/cuyT/oQltIo3rY5HJBOGLq+prIFHcLVR1V3sWIV2XryUXbtvQlFfk9ofv+rg2bnWjPmq1vNgnaReViyZvWHWMFEP77PUZDgRyIOJopYId2I1qMHZIOBx3IVpqfuqwpfu0H/HBP6GJPO5Fuz0bTiRxLUlq1WEZMkK6YB2uMP0aCRq97DZplQPoeShaL7uvs+o/3p8mYB69+tP57i8wcYnA1KjlYEqVN0BpEDwqavVMVaGs4K6B/17EzC4NsAVJ32sWM5r5ISUpWZJctSNCOoF1XcZioPX5/fhp9qOHPELyzORtyAp79W2FHQIr0B6JxMqyQOhAnQ13TDLpp299Kn2aMOD4n5cdDlVq7CxymUvxU0N19+jFUxPl//TIgsdX1Yg+QVarmxdjAFRIUSJ70yrMO6k8X0DRZ3R+/d6VXTSH4NZ1H/GiPfBUWIyk1pgLaG+mbVrm73IAO+b82j57SNV8+SUeHb4EeUFvecibuLffEk6GX/RjxyeQVZAEo6FK+GG5a3FSPeIexEZhJk+DuRo2gndmR8JBx+np+nWqNGq9U30XlWXqzPDQlMNaegj43Ey5M7B0jfNiwxl7j0a3h13Ov9WXxzxvRqhcf5DuzsYXb0FCL58ZGmETQvoA2mR5OYbLTAtODaUvgx27vTy44ncjXQMPnAegrAgiyI+skq83fQrOy2HEFfcGpMG1yaI+YJ+b4FWtaiuw3FAhN8I2jd/sNuJXTtra8HyD79ChYtA3L/nil5ZkNoMUUrof9VNAT/Cy/2Ua8IFljGzGDpvaQ0CJa78PtCKpjaxsTLd4Ge8Z4QK7/0bCe/wr3Mo1c88r16cBTCkoLD9bN2eE0dmxEBR1vQRvxbomZBzN9dpDtcVq71fU/7doMNugKdQ+1deIVgSX9YCMy90TvHMF73dcwoREcOeH0CLRmlSwtFm1+zPRTXgkCFHjx/F4QZsf+4LQ2/fheNVYtj8eTlYlkMGs+FMIP+w0GkBBA3wbotgqDNC8/N7g4IYPeDz29KI1NkzUhjp0VKLqHJStNTQwq3L37VV3xeGQLzvNLMnrO6SjKnJ2XXVzIOJrYhlOHNbj8jJBFUhp4eRk0LWL2p9VhysnmGaUHH2RtcFaeoyExRrC9okkCkRtB+4oSdsqW6hrno2xiRFeG2kCTOdzBzJy5QqSwETQ6aCvQrYJ2FWhL9UJmRxtbBuOipA1MGXQaDE5aK4pVPmA4NRCM8NsReXA0Te0wxxvQ7IeyHo0KdAIxNmkSv2Oq9bTSPkcul/ZiKUOScTRSrg70B0Zt/qGoli4TpCGOhYaXXI18ahO503OVr87cL6rmDJpNDkFHC4hLvXdytS8h6EpDdq4A3dA1rWJETyZ1odOfJ/cNFenWatd9XI8qUK5ZIHeqfR+JWpoiVBdzhkxYc0rMtAyeXNhTvlocfm1jSWTC/RkUdGegXQ26fHXV/tEdA5UYXfTKlEdRpr0FrSOpwq1z8seRHjPQbDgTmfBcgtnydyKMGL+5rI7xrDZ24AK7LFBVu+qsoEtGju3+jY4/5GBATJAaoAjzdCRIYapGrHX56l9YqAPj/LDnacv68O1D5RiyKpp8ic4GOQxGkG100CY96shwEcwmF27aVdfxAJ3riFNfWs9pHlj51YZ0zPPEZEUX13rf5NIh+DDM1cJNlO1YzeGymYO8Bgv8oEZUt49Gnc0ROdtOaJMbzr7YUU5PuXerCUomXJFTB+j3XKiCeDSfeTso8fv9veTwl6LwJlkn7a63+AOqI3PXQVtT8jgclTKAC45DwuUsAzktiCFo+BVOp8NVoEMGbWRIQx2DRz3jVJYMy7LG/RKtLzZkKrQfj/cp6ZwbeboZ2SlmNHNdA1BWk8ZwsTYdWlsirlF5eWkrY7oGG9Nl1YsMWkQ5X0eUlnGdN/RirD6ys6o/hg2NVaaxbAayF+YHPtak82kuR2UCbU51xPOO0qWOuYRRGM12rXn4HBue8krT+CjoBa5aYR+Ar4rOUY7daPSSKaNSe4NiWems0bRrZfo4TSErzQkcTrccbJVk+cjFpzXc9eClnP8LOqC3Bq1c04Nen07Nbgf9oG6OUhLL6MLhsM0mshuih9yLNevOG1PrS67peUSpYxeXVadOBX/jgDNrauJhTPUCevVFBCpW7n38Eo805UVHG2oj1ILJfZBX9CdTw36WNmY6aSGlE0L4aazzAHR/xOBxG4/JsQfzOD/CK+1OWfZtLvWhJwGhDcR+flzGByMRwqeg4TCVSDx4l7KSBqk+blsetpw4cC64/TTWIPaz6WC/LoHXt72KecEaO/c0R7h765/kQnScv2cTM+T/a4z7s5W28kUB/YTu/FmEmscLDd+bpoBZVsnCChW6rW45QRf8ev6ilJPqiM0JOvztDJMj3cz48N8Cvdno4Bx3+qp8OVqrxlLFOqViu3CS3dyfq+E6e8qS+0qfIENABfMMzZO+fVQpXwaNtha1hDoNzWnra+RA4Y5lnWudokg/j1kISNbM/fvfz+UFkUy3/N33y3aJ5+vWNZZ2wi5x7ppHAtcDHOK9TP/Gw43HpE0NDtWCKrGhEQmKOaFYegJu+1zC36OgO/fy+96Tjo/iPsR4vE6dLLGYoqlJfIX9omWaDt4iO4rmwzUF6OafpKCRS3r5xe+eoFdfkSp1Whd6gJVaNGnIP9RdVSIeP4+Vds1ppZffk6Z26sLmPkR4VAwwOHJMpLpj6NxYUzcxjRWZkNkcM+MO22K9cwtUfYR1ySrk+amhU0eWkce6nAcS10Ogl5QTcNZEOXDXsf1MvMtdVZ7qJeuFHGvaJlNQxurdepaYuOJId1xPzSJf1t4eTvkLZeTmjd4Q7bYxRhkjZ0jhZRhUqS2EuLMBq/6j5b5Lw5mRCTNor+36N37i1V1wEwUMZed8eFai1mdlAGs/2ticHErCfQeBwadsmzHRatRpq0O3svI2Ygj52PX/1cpqyROjNYQZaPa53HJNOXZi5L44TS/2eL/41KMFUbwhxjg+4n3JeTHk1/EEU7eZO+HAnIlxS1tjTASdM+hQvCKrGzp4u2LSBaYFuFZb+lBSzKArDhP4HwDdqAXV3cuqZLQJ0hzYf3vbhe7E9DbRjWNpEM+twn1sXayaKDmGRqlCmyg0DNPs+FM5vi39CzkV8O6GcQnhaO3bWbFdLUYkwbSzEQFDniLQ3aR7dQDfAbq2CZjuES3sPg9MkLNn3KcnopMnQgY92zBEW2k6L6gVQgDYpooNX4F2B2j6OyRetceIgGn6OIZO5Ez6MSGFJIHKyYx9f0JsbZNkMPd9df8SzMRccm0cYBV0VND7fgK9gbQbj37EqszMaQ7K6g0lqraqmHatk2QvX5/GMrbDpUqneBKQ8kwQDSFBSeddFbaxqW+20JmB05XWCY7IK0MzgAJ+BzpVTZTNdEdFxidMx9rmnknuPjD2Wb2CDqmT+rJVvHzYkUDHfUE0x2OqBPmYo+e1M5LDTlOR0FzGn49Ac+5vDbqz8eQZdIMMU6HkzkNu7vQ1C6Vdwy3bkgmLbrbZ36dSDDza1YoRZeRG/0cbDpJKbOmDZtC1TG/3oE8shLLS7kgUuRcHDAfNVzP1O7rlSR03Z83mIXNNFbRn3hhFCQXtbkAHtpPUoL3NNd2sULQX0FMfX2508rkhJlq0qzFDZf/87vK05WGM9riKB+m+E2BuL4J2Wkf0oJoaaBM+qHePaVvrEj4PodAz3pVebE7Kvo0hQ05AYTBSsUgKOmIoKVvkdKXTq6CZHpoJei+8/RddvT8dJ6Q0aSW75Mm1yFtlEj0ZKuKVgOa9Q1CHxS0imuhvNuJT8dhzdYvzkuaKzf2Cf5kw+XXqLG5+1HmONTOq8LYe6QQDjdLUBOVNGtbqbrXH5RZ0UtBrLn5eNB74zu1o9pgAGqUMsHfaB3c3szJ31WdwAq0ynWhcxn251R77rfbw9VTkGvTcvzpu/xq3Ric/obnex8zrX/Id15zepUfv4LNWXm4Wjxr0puKvoPspi8cj0EXlZZnGhJr2RSpBO1pDvU5lvmUYGmZyou/JhAIalS/V0xAygp5q0I/NeNVRtOaV/ujSy+kAv+XBP/Sibm7C5nRgsfIiTmKftYenRYw3oFPLsS++vfPycrImgw6t9bl8zuq9rzz33VDdFqQUHbWHE5JTCjipqLyLybTLDlN3gPYGunH3oNucYaqCAO70qX99lHMIOiW/L4Pyp6oNEIV/9F5dNX+sVOkcW9tGNNcUkcvCWTQHaJu1Nlrk4xjj3IPGmEK67t8IyRe3Xnc/pv7RvAkL3fzY6Nz/7IUvrd4HJ/W60uAkRGS3cxAA0L/CUoMGv8yTqU7Qbx8dyaPgu9z4yi/TvxZ0IqOldTsmSTu721H7K9od0MZRa/ohg6Z4eBTW2CjuIdOLRDQ9PdYl3IG+ZC/vDW39Suj23waMmtfziD3Pa1IycM4zGuiEvc8a+Ro71todY0SWmSd0T7L4mUHzLiOXIwg4eojC353NUN3MQ5nUZzo1k7a4I4D1FY8MbG1GEGrkVJgreFZx1yb9PnlxbrQPl8wV6wlY6CXNM0LZf4PW+9XNro40uKBBeesKYi9HCnNk38qCSaOKh63TrqSQV7srkE6Q1XoVKsjmUt4PYPwa7M2vIfwNiiScihz725ihKuu9mBUg6KEMIvKhosZaLqz8t4Rsos+DuT+5f9nj65C3Ahshgt20lTeB0Qmox50VlVCdJWDVewJqn4tV/o45W7d3v/vsUOm9fVDrbOG0/nc3S7v/DQYO07IiByQn77aKJnTJYYb2blm0fDhie4z/RK7/wXsX0SOcxUR3HXSkcLSKRpUPy5qWdmByDmPmLz85tL5YZUHubhqFzBhnm9nNHr3dsmW0wN6mxabqhrLRqBnbiYMUR1dA49YSSUEvx3Bb9qeTGz59PLzf1tPj8d1Yj5lNzJc1fZXsIakj/zk2ZVbukRTqkTCso3syE4tMw6HOfIyohMKXQH+Uf5/cQ/bBrU1xX9dcc39axs53ZDPQpSnX+ePmu0GTAMy8ecvRP72n6x1x9tGdestEsSe3ZLVxGKQbPbxRq40ESKneXKvTHEVJFSk19GsPI7r+xB976R6xHNlXZwKf3sA33/Nu9JgHvD/e0+5v2TyP2ysLfo7+iI508FQ2U7K7Heu07k0f0koWabPMIluxHWNBPYjNng8kvX+y+7xByJ2TMVWxyG7kfT5u27WsoHq5HumynVV8byWB5H6t3uOucAun4Tqdog3Ty9G4LVSapQbl4stXvmCKy0orOeSFZV4w0HrX2yBZwq595Gj9owrf526b+6feUfsN42kGtIIV7LcXPK3q+D8Oyh/SFQRAxgAAAABJRU5ErkJggg==';

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const parse = s => { const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(String(s || '')); return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null; };

  /** 日本時間の今日（YYYY-MM-DD） */
  function todayJst() {
    const d = new Date(Date.now() + 9 * 3600 * 1000);
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }
  /** 1か月後の同じ日（その月に無い日は月末） */
  function addMonth(s) {
    const p = parse(s); if (!p) return '';
    let y = p[0], m = p[1] + 1; if (m > 12) { m = 1; y++; }
    const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return y + '-' + pad(m) + '-' + pad(Math.min(p[2], last));
  }
  function wareki(s) {
    const p = parse(s); if (!p) return '';
    const [y, m, d] = p;
    const key = y * 10000 + m * 100 + d;
    const era = key >= 20190501 ? ['令和', y - 2018] : key >= 19890108 ? ['平成', y - 1988] : ['昭和', y - 1925];
    return era[0] + (era[1] === 1 ? '元' : era[1]) + '年' + m + '月' + d + '日';
  }
  const yen = v => (typeof v === 'number' || /^\d+$/.test(String(v))) ? Number(v).toLocaleString('ja-JP') + '円' : String(v || '');
  const slash = s => { const p = parse(s); return p ? p[0] + '/' + pad(p[1]) + '/' + pad(p[2]) : ''; };
  const ymdJa = s => { const p = parse(s); return p ? p[0] + '年' + p[1] + '月' + p[2] + '日' : ''; };
  function empKind(empType) {
    if (/パート|アルバイト/.test(empType || '')) return 'パート';
    if (/契約/.test(empType || '')) return '契約社員';
    if (/社員/.test(empType || '')) return '正社員';
    return '';
  }

  const CSS = `
.npdoc{width:794px;min-height:1123px;box-sizing:border-box;padding:40px 56px 30px;background:#fff;color:#111;font-family:"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP","Hiragino Sans","Noto Sans JP",serif;font-size:12.5px;line-height:1.45;position:relative}
.npdoc *{box-sizing:border-box}
.npdoc h1{color:#111;font-size:22px;text-align:center;margin:0 0 14px;letter-spacing:.3em;font-weight:700}
.npdoc table.k{width:100%;border-collapse:collapse;table-layout:fixed}
.npdoc table.k td,.npdoc table.k th{border:1px solid #222;padding:3px 7px;vertical-align:middle;font-weight:normal;text-align:left}
.npdoc table.k th{text-align:center;width:118px}
.npdoc .vert{width:26px!important;padding:4px 0!important;text-align:center!important;line-height:1.9}
.npdoc .kana{font-size:11px;letter-spacing:.05em}
.npdoc .nm{font-size:17px;text-align:center;letter-spacing:.2em}
.npdoc .ttl{font-size:14px;font-weight:700;text-align:center!important;padding:6px!important}
.npdoc .box{border:1.3px solid #111;padding:0 4px;margin:0 -1px}
.npdoc .ln{display:block}
.npdoc .sub{padding-left:1.5em}
.npdoc .sign{margin-top:10px}
.npdoc .date{text-align:right;margin:0 40px 6px 0;font-size:13.5px}
.npdoc .party{display:flex;align-items:flex-start;margin:6px 0 0 30px;min-height:72px}
.npdoc .party .who{width:64px;font-size:13.5px;padding-top:2px}
.npdoc .party .info{flex:1;font-size:13px;line-height:1.7}
.npdoc .party .stamp{width:130px;height:76px;position:relative;text-align:center}
.npdoc .party .stamp .in{position:absolute;left:44px;top:22px;font-size:13px;color:#555}
.npdoc .party .stamp img.seal{position:absolute;left:24px;top:-2px;width:74px;height:74px}
.npdoc .party .stamp img.sig{position:absolute;left:-60px;top:4px;max-width:190px;max-height:66px}
.npdoc .party .stamp .es{position:absolute;left:-60px;top:62px;width:190px;font-size:9px;color:#666;white-space:nowrap}
.npdoc .ebox{margin-top:12px;border:1px dashed #999;padding:6px 10px;font-size:10px;color:#444;line-height:1.5}
.npdoc.nda{font-size:11.6px;line-height:1.5}.npdoc .nda p,.npdoc.nda p{margin:0 0 5px;text-align:justify}
.npdoc.nda h3{font-size:12px;margin:7px 0 1px;font-weight:700}
.npdoc .nda ol{margin:0 0 6px;padding-left:0;list-style:none}
.npdoc .ndaf{margin-top:10px;line-height:1.9;font-size:12.5px}
.npdoc .ndaf .u{display:inline-block;min-width:420px;border-bottom:1px solid #222;padding:0 6px}
.npdoc .ndaf .sigwrap{position:relative;display:inline-block;min-width:420px;border-bottom:1px solid #222;height:44px;vertical-align:bottom}
.npdoc .ndaf .sigwrap img{position:absolute;left:150px;bottom:2px;max-height:52px;max-width:220px}
.npdoc .ndaf .sigwrap span{position:absolute;left:6px;bottom:2px}
`;

  /**
   * 雇用契約書
   * d = { name, kana, birth(YYYY-MM-DD), postal, address, empType, date(YYYY-MM-DD), end, wage(時給・円), signature(画像URL), electronic(bool), signedAt, receiptNo, seal(false で押印しない) }
   */
  function contractHtml(d) {
    d = d || {};
    const C = CONTRACT;
    const date = d.date || '', end = d.end || addMonth(date);
    const kind = empKind(d.empType);
    const opt = (label, on) => on ? '<span class="box">' + label + '</span>' : label;
    const kinds = ['正社員', '契約社員', 'パート'].map(k => opt(k, kind === k)).join('　・　');
    const ren = ['自動的に更新する', '更新する場合がある', '更新しない'].map(k => opt(k, C.renewal === k)).join('　・　');
    const crit = C.renewalCriteria;
    const blankDate = '令和　　年　　月　　日';
    const sig = d.signature
      ? '<img class="sig" src="' + esc(d.signature) + '" alt="署名"><span class="es">' + (d.electronic ? '電子署名（押印に代えて署名）' : '') + '</span>'
      : '<span class="in">印</span>';
    return '<div class="npdoc">' +
      '<h1>雇用契約書</h1>' +
      '<table class="k">' +
      '<colgroup><col style="width:26px"><col style="width:92px"><col><col style="width:62px"><col style="width:170px"></colgroup>' +
      '<tr><td class="vert" rowspan="3">労<br>働<br>者</td><th class="kana">フリガナ</th><td class="kana">' + esc(d.kana) + '</td><th rowspan="2">生年<br>月日</th><td rowspan="2" style="text-align:center">' + esc(ymdJa(d.birth)) + '</td></tr>' +
      '<tr><th>氏名</th><td class="nm" style="height:40px">' + esc(d.name) + '</td></tr>' +
      '<tr><th>現住所</th><td colspan="3" style="height:40px">〒 ' + esc(d.postal || '') + '<br>' + esc(d.address || '') + '</td></tr>' +
      '</table>' +
      '<table class="k" style="border-top:0">' +
      '<colgroup><col style="width:118px"><col></colgroup>' +
      '<tr><td class="ttl" colspan="2">' + (date ? esc(wareki(date)) : '令和〇年〇月〇日') + 'より下記の労働条件で契約します</td></tr>' +
      '<tr><th>雇入年月日</th><td>' + esc(slash(date)) + '</td></tr>' +
      '<tr><th>雇用形態</th><td>（　' + kinds + '　）</td></tr>' +
      '<tr><th>雇用期間</th><td>' +
        '<span class="ln">　1　期間の定めなし</span>' +
        '<span class="ln">　<span class="box">2</span>　期間の定めあり　　' + (date ? esc(wareki(date)) + '～' + esc(wareki(end)) : '令和　年　月　日～令和　年　月　日') + '</span>' +
        '<span class="ln sub">雇用期間の更新の有無</span><span class="ln sub">（' + ren + '）</span>' +
        '<span class="ln sub">契約の更新は次により判断する</span>' +
        '<span class="ln sub">・' + esc(crit[0]) + '　・' + esc(crit[1]) + '</span>' +
        '<span class="ln sub">・' + esc(crit[2]) + '　・' + esc(crit[3]) + '　・' + esc(crit[4]) + '</span></td></tr>' +
      '<tr><th>就業の場所</th><td>' + esc(C.place) + '</td></tr>' +
      '<tr><th>仕事の内容</th><td>' + esc(C.job) + '</td></tr>' +
      '<tr><th>就労の時間</th><td style="height:28px">' + esc(C.hours) + '</td></tr>' +
      '<tr><th>休　　憩</th><td style="height:28px">' + esc(C.rest) + '</td></tr>' +
      '<tr><th>休　　日</th><td style="height:28px">' + esc(C.holiday) + '</td></tr>' +
      '<tr><th>賃　　金</th><td>　　　　' + esc(C.wageType) + '　　　　' + esc(yen(d.wage || C.wage)) + '</td></tr>' +
      '<tr><th>手　　当</th><td style="height:28px">' + esc(C.allowance) + '</td></tr>' +
      '<tr><th>昇給</th><td style="height:26px">' + esc(C.raise) + '</td></tr>' +
      '<tr><th>賞与</th><td style="height:26px">' + esc(C.bonus) + '</td></tr>' +
      '<tr><th>賃金の支払</th><td>　' + esc(C.payday) + '</td></tr>' +
      '<tr><th>退　職　に<br>関する事項</th><td>' + C.retire.map(t => '<span class="ln">　' + esc(t) + '</span>').join('') + '</td></tr>' +
      '<tr><th>定年および<br>継続雇用</th><td>　' + esc(C.retireAge) + '</td></tr>' +
      '<tr><th>そ の 他</th><td>' + C.other.map(t => '<span class="ln">' + esc(t) + '</span>').join('') + '</td></tr>' +
      '</table>' +
      '<div class="sign">' +
      '<div class="date">' + (date ? esc(wareki(date)) : blankDate) + '</div>' +
      '<div class="party"><div class="who">雇用者</div><div class="info">' + esc(COMPANY.address) + '<br>' + esc(COMPANY.name) + '<br>' + esc(COMPANY.repTitle) + '　' + esc(COMPANY.repName) + '</div>' +
        '<div class="stamp"><span class="in">印</span>' + (d.seal === false ? '' : '<img class="seal" src="' + SEAL + '" alt="会社印">') + '</div></div>' +
      '<div class="party"><div class="who">労働者</div><div class="info">' + esc(d.address ? '〒' + (d.postal || '') + ' ' + d.address : '') + '<br>' + esc(d.name) + '</div>' +
        '<div class="stamp">' + sig + '</div></div>' +
      '</div>' +
      (d.electronic ? '<div class="ebox">本契約は、労働者の同意に基づき電子的方法により締結しました。労働者欄は押印に代えて本人の署名によります。' +
        (d.signedAt ? '　締結日時：' + esc(d.signedAt) : '') + (d.receiptNo ? '　受付番号：' + esc(d.receiptNo) : '') + '</div>' : '') +
      '</div>';
  }

  /** 秘密保持確約書  d = { name, address, postal, date, signature, receiptNo, signedAt } */
  function ndaHtml(d) {
    d = d || {};
    const art = (t, body) => '<h3>' + t + '</h3>' + body;
    const P = s => '<p>' + s + '</p>';
    return '<div class="npdoc nda">' +
      '<h1 style="letter-spacing:.2em">秘密保持確約書</h1>' +
      P(esc(COMPANY.name) + '<br>' + esc(COMPANY.ndaTo) + '　殿') +
      P('私は、貴社において勤務または業務に従事するにあたり、業務上知り得る秘密情報および個人情報等を適切に取り扱い、これらを第三者に漏洩、開示または不正に利用しないことを、以下のとおり確約いたします。') +
      art('第1条（秘密情報の定義および秘密保持義務）', P('私は、役員、従業員、契約社員、出向社員、インターンその他、名称または職務の如何を問わず、貴社において勤務または業務に従事することにより知り得た、次の各号に定める情報（以下「秘密情報」といいます。）について、厳重に秘密として管理し、第三者に対して一切開示、漏洩または提供せず、私が正当に担当する職務の遂行に必要な範囲に限り使用するものとします。') +
        P('1．貴社が取り扱う顧客、会員、取引先その他の者に関する個人情報その他一切の個人に関する情報<br>2．貴社の事業計画、営業計画、開発計画、業務内容、営業ノウハウ、その他これらに付随する一切の非公開情報<br>3．貴社が第三者から秘密保持義務を負うことを条件として取得した情報<br>4．その他、貴社が秘密として管理していることが明示されている情報、またはその性質上、秘密として取り扱うべき情報')) +
      art('第2条（秘密情報へのアクセス制限）', P('私は、正当に担当する職務の遂行に必要な範囲を超えて、秘密情報にアクセス、閲覧、取得または利用しません。<br>また、権限を付与されていない秘密情報について、アクセス、閲覧、取得または利用を試みません。')) +
      art('第3条（複製・保存等の制限）', P('私は、担当する職務の遂行上必要かつ正当な理由がある場合を除き、秘密情報を含むデータ、書類、資料、記録媒体その他一切の情報を複製、撮影、録音、保存または持ち出しません。<br>業務上必要な理由により複製、保存または持ち出しを行う場合には、貴社所定の手続きおよび事前の承認を受けるものとします。')) +
      art('第4条（個人情報および資料の廃棄）', P('私は、個人情報または秘密情報が記載・保存された書類、データその他の資料を廃棄する場合、情報の散逸、漏洩、投棄または第三者による取得が生じないよう、貴社の定める方法に従い、厳重な注意をもって廃棄します。')) +
      art('第5条（情報の持ち出し等の禁止）', P('私は、貴社の顧客情報、個人情報、営業情報、業務上知り得た情報その他の秘密情報について、貴社の許可なく、社外へ持ち出し、送信、転送、コピー、撮影、録音、保存または第三者へ提供する行為を一切行いません。<br>また、退職、契約終了その他の理由により貴社との関係が終了した後も、秘密情報を自己または第三者のために利用しません。')) +
      art('第6条（秘密保持義務の存続）', P('本確約書に基づく秘密保持義務は、貴社における勤務期間または業務従事期間中のみならず、退職、契約終了その他の理由により貴社との関係が終了した後も存続するものとします。')) +
      art('第7条（違反時の責任）', P('私が本確約書に定める義務に違反し、これにより貴社に損害を生じさせた場合、私は、貴社に生じた一切の損害について、法令に従い賠償する責任を負うものとします。<br>また、故意または重大な過失による秘密情報の漏洩、顧客情報・個人情報の持ち出し、不正利用、第三者への提供その他重大な違反があった場合には、貴社からの損害賠償請求その他必要な法的措置を受けることについて異議を述べません。<br>なお、具体的な損害額の算定が困難な場合であっても、貴社が被った損害について、合理的な範囲においてその賠償責任を負うものとします。')) +
      art('第8条（返還・削除義務）', P('私は、退職、契約終了その他の理由により貴社との関係が終了した場合、または貴社から返還・削除を求められた場合には、秘密情報を含む書類、データ、記録媒体その他一切の資料を速やかに返還、削除または廃棄し、自己の手元に残置しません。')) +
      art('第9条（管轄裁判所）', P('本確約書に関して紛争が生じた場合、その訴訟については、札幌地方裁判所を第一審の専属的合意管轄裁判所とします。')) +
      P('以上、本確約書の内容を十分に理解し、これを遵守することを確約いたします。') +
      '<div class="ndaf">' +
      '<div>' + (d.date ? esc(wareki(d.date)) : '令和　　　年　　　月　　　日') + '</div>' +
      '<div>住所：<span class="u">' + esc(d.address ? '〒' + (d.postal || '') + ' ' + d.address : '') + '</span></div>' +
      '<div>氏名：<span class="sigwrap"><span>' + esc(d.name) + '</span>' + (d.signature ? '<img src="' + esc(d.signature) + '" alt="署名">' : '') + '</span>　' + (d.signature ? '' : '印') + '</div>' +
      '</div>' +
      (d.signature ? '<div class="ebox">本確約書は、Webフォームにより電子的方法で提出されました（押印に代えて本人の署名）。' + (d.signedAt ? '　提出日時：' + esc(d.signedAt) : '') + (d.receiptNo ? '　受付番号：' + esc(d.receiptNo) : '') + '</div>' : '') +
      '</div>';
  }

  function injectCss(doc) {
    doc = doc || document;
    if (doc.getElementById('npdoc-css')) return;
    const s = doc.createElement('style'); s.id = 'npdoc-css'; s.textContent = CSS; (doc.head || doc.documentElement).appendChild(s);
  }

  root.NPDocs = { COMPANY, CONTRACT, SEAL, CSS, contractHtml, ndaHtml, injectCss, todayJst, addMonth, wareki, slash, empKind };
})(typeof window !== 'undefined' ? window : this);
