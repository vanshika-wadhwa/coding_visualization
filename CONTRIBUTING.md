# Developer Guide

This document helps developers understand the structure of the Coding Visualization Platform.

## Project Architecture

Backend
Flask handles routing, authentication, and database operations.

Database
SQLite database stores user information such as username, email, and password.

Frontend
HTML templates inside the templates folder render the interface for algorithm visualizations.

## Folder Structure

app.py
Main Flask application

templates
HTML files for UI pages

static
CSS, JavaScript, and images

docs-site
Docusaurus documentation project

## Running the Development Environment

Start Flask server

python app.py

Start documentation server

cd docs-site
npm run start

## Contribution Guidelines

* Follow clean code practices
* Write descriptive commit messages
* Test new features before pushing
