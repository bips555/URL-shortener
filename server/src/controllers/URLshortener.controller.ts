import URLshortenerModel from "../models/URLshortener.model";
import express from "express";
export const createURL = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const urlFound = await URLshortenerModel.find({ fullUrl });
    if (urlFound.length > 0) {
      res.status(409);
      res.send({"message":"URl already exists."});
    } else {
      const shortUrl = await URLshortenerModel.create({
        fullUrl
      });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getAllURL = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await URLshortenerModel.find().sort({createdAt:-1});
    if (shortUrls.length < 0) {
      res.status(400).send({ message: "Short Url's not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getURL = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await URLshortenerModel.findOne({shortUrl:req.params.id});
        if (!shortUrl) {
          res.status(404).send({ message: "Full Url not found" });
        } else {
          shortUrl.clicks++
          shortUrl.save()
          res.redirect(`${shortUrl.fullUrl}`)

        }
      } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
      }
};

export const deleteURL = async (
  req: express.Request,
  res: express.Response
) => {
    try {
        const shortUrl = await URLshortenerModel.findByIdAndDelete({_id:req.params.id});
        if (shortUrl) {
          res.status(200).send({ message: 'Requested Url successfully deleted' });
        } 
          else
          {
            res.status(404).send({message:"Cannot find Url"})
          }

        }
       catch (error) {
        res.status(500).send({ message: "Something went wrong" });
      }
};
