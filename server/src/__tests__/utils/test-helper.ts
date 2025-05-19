import { Request, Response } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { IUser } from "../../models/User";

// Mock request/response factory
export const mockRequestResponse = () => {
  // Create a mock user that matches the IUser interface
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockUser = {
    _id: mockUserId,
    name: "Test User",
    email: "test@example.com",
    role: "teacher",
    isAuthenticated: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    // Add methods required by Mongoose Document
    $assertPopulated: jest.fn(),
    $clearModifiedPaths: jest.fn(),
    $clone: jest.fn(),
    $createModifiedPathsSnapshot: jest.fn(),
    $getPopulatedDocs: jest.fn(),
    $getAllSubdocs: jest.fn(),
    $ignore: jest.fn(),
    $isDefaultArray: jest.fn(),
    $isDefault: jest.fn(),
    $isEmpty: jest.fn(),
    $isValid: jest.fn(),
    $locals: {},
    $markValid: jest.fn(),
    $model: jest.fn(),
    $parent: jest.fn(),
    $op: null,
    toObject: jest.fn().mockReturnValue({
      _id: mockUserId,
      name: "Test User",
      email: "test@example.com",
      role: "teacher",
      isAuthenticated: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    toJSON: jest.fn().mockReturnValue({
      _id: mockUserId,
      name: "Test User",
      email: "test@example.com",
      role: "teacher",
      isAuthenticated: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  } as unknown as IUser;

  const req: Partial<Request> = {
    user: mockUser,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };

  return { req, res };
};

// Database connection and cleanup
let mongoServer: MongoMemoryServer;

export const connectTestDB = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
};

export const disconnectTestDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

export const clearTestDB = async (): Promise<void> => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
