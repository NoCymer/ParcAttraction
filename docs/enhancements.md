# Enhancements

This document provides possible enhancement that could be interesting to be implemented in the future

## 1. Images for attractions

Each attraction could have one or more image to give more information to the user, also this could enhance the UX and the overall appearance of the website.

### Cost

```text
1 Day
```

This feature could take as much as **1 Day** to be implemented as the database schema needs to be revisited to implement an additionnal field, also the manipulation of blobs can be tricky explaining the high cost of this functionnality

## 2. Moderation tools for reviews

As of now the reviews cannot be deleted by an administrator, which is problematic, this functionnality would allow for an easy management of user reviews.

### Cost

```text
4 Hours
```

This feature would be easy to implement as it only requires an additionnal route to be defined in the api and a simple addition of a button on the client side.

## 3. Spam prevention

A way of preventing review spam could be implemented as of now any malicious attacker could review bomb any attraction of the website

### Cost

```text
1 Day
```

This feature can be quite tricky to implement as it requires the management of counting each and every request and associating it with it source and rate limiting the api, this could be tricky to implement hence the high time cost.