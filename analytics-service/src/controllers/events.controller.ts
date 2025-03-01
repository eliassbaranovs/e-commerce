import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as eventService from '../services/events.service';
import { AnalyticsEvent } from '../types';

export const createEvent = (req: Request, res: Response) => {
  try {
    const { type, userId, url, metadata } = req.body;

    if (!type) {
      return res.status(400).json({ error: "Event type is required" });
    }

    // Create a properly typed event object
    const event: AnalyticsEvent = {
      id: uuidv4(),
      type,
      userId: userId || uuidv4(),
      timestamp: new Date().toISOString(),
      url,
      metadata,
      ip: req.ip || '::1', // Provide a default IP if req.ip is undefined
    };

    eventService.addEvent(event);
    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error("Error recording event:", error);
    res.status(500).json({ error: "Failed to record event" });
  }
};

export const getAllEvents = (_req: Request, res: Response) => {
  try {
    const data = eventService.getEvents();
    res.json(data);
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({ error: "Failed to retrieve events" });
  }
};

export const getEventsByType = (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const events = eventService.getEventsByType(type);
    res.json({ events });
  } catch (error) {
    console.error("Error retrieving events by type:", error);
    res.status(500).json({ error: "Failed to retrieve events" });
  }
};