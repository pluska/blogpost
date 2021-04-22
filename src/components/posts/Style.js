import style from "styled-components";

export const Image = style.img `
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 100%;
    height: 200px;
    padding: 5px 16px;
`;

export const Title = style.h4 `
 font-weight: bold;
 font-size: 22px;
 margin: 0;
 margin-top: 20px;
`;

export const Content = style.p `
    color: grey;
    font-size: 18px;
    text-align: justify;
`;

export const NameAuthor = style.span `
    font-size: 22px;
    color: black;
    float: left

`;

export const PostDate = style.span `
    font-size: 22px;
    color: black;
    float:right;
`; 
